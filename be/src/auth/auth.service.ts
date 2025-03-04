import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as SendGrid from '@sendgrid/mail';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto';
import { jwtConstants, sgMailConstants } from './constants';
import { PrismaService } from './../prisma/prisma.service';
@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {
        SendGrid.setApiKey(sgMailConstants.apiKey);
    }
    async validateUser(email: string, pass: string): Promise<any> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email }
            });
            if (!user) {
                return null;
            }
            const isMatchPassword = await this.verifyHash(pass, user.password);
            if (!isMatchPassword) {
                return null;
            }
            const { password, ...result } = user;
            return result;
        } catch (error) {
            throw new Error("Internal Server Error");
        }
    }
    async login(user: any) {
        const payload = { sub: user.id, email: user.email, role: user.role };
        const accessToken = this.generateAccessToken(payload);
        const refreshToken = this.generateRefreshToken(payload);
        await this.storeRefreshToken(user.id, refreshToken);
        return {
            accessToken,
            refreshToken,
        };
    }
    async register(authDto: AuthDto) {
        try {
            const userExist = await this.prisma.user.findUnique({
                where: {
                    email: authDto.email,
                }
            });
            if (userExist) {
                throw new ConflictException('User already exists');
            }
            const hash = await this.generateHash(authDto.password)
            const user = await this.prisma.user.create({
                data: {
                    email: authDto.email,
                    password: hash,
                    role: 'admin',
                    firstName: authDto.firstName,
                    lastName: authDto.lastName,
                }
            });
            delete user.password;
            return user;
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error;
            }
            throw new InternalServerErrorException('Server Error');
        }
    }
    async send(mail: SendGrid.MailDataRequired) {
        const transport = await SendGrid.send(mail);
        // avoid this on production. use log instead :)
        console.log(`E-Mail sent to ${mail.to}`);
        return transport;
    }
    generateAccessToken(payload: any): string {
        return this.jwtService.sign(payload, {
            secret: jwtConstants.accessTokenSecret,
            expiresIn: '3600s'
        })
    }
    generateRefreshToken(payload: any): string {
        return this.jwtService.sign(payload, {
            secret: jwtConstants.refreshTokenSecret,
            expiresIn: '7d'
        })
    }
    async generateHash(currentData: string): Promise<string> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(currentData, saltOrRounds);
        return hash;
    }
    async verifyHash(currentData: string, hashData: string): Promise<boolean> {
        const isMatch = await bcrypt.compare(currentData, hashData);
        return isMatch;
    }
    async storeRefreshToken(userId: number, token: string): Promise<void> {
        try {
            const hashedToken = await this.generateHash(token);
            await this.prisma.refresh_Token_User.upsert({
                where: { userId },
                update: { refresh_token: hashedToken },
                create: { userId, refresh_token: hashedToken },
            });
        } catch (error) {
            console.error("Error storing refresh token:", error);
            throw error;
        }
    }
    async getUserIfRefreshTokenMatched(userId: number, refreshToken: string) {
        try {
            const user = await this.prisma.user.findUnique({
                where: {
                    id: userId,
                },
                include: {
                    refresh_token_user: true
                },
            });
            if (!user) {
                return null;
            }
            const isMatch = await this.verifyHash(refreshToken, user.refresh_token_user.refresh_token);
            if (!isMatch) {
                throw new Error("Internal Server Error");
            }
            delete user.refresh_token_user;
            delete user.password;
            return user;
        } catch (error) {
            throw error;
        }
    }
}