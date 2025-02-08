import * as bcrypt from 'bcrypt';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { AuthDto } from './dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }
    async validateUser(email: string, pass: string): Promise<any> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { email }
            });
            if (!user) {
                return null;
            }
            // compare password
            const isMatchPassword = await bcrypt.compare(pass, user.password);
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
        const accessToken = this.jwtService.sign(payload, { expiresIn: '10s' });
        const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
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
            const saltOrRounds = 10;
            const hash = await bcrypt.hash(authDto.password, saltOrRounds);
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
}