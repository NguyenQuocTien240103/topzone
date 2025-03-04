import { Controller, Get, Post, Body, UseGuards, Request, Res } from "@nestjs/common";
import { Response } from 'express';
import { Roles } from './decorator/roles.decorator';
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { GoogleAuthGuard, RolesGuard, JwtAuthGuard, LocalAuthGuard, JwtRefreshTokenGuard } from './guard'
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    async googleLogin() {

    }
    @UseGuards(GoogleAuthGuard)
    @Get('google/callback')
    async googleCallback() {

    }
    // @UsePipes(new ValidationPipe())
    @Post('register')
    register(@Body() authDto: AuthDto) {
        return this.authService.register(authDto);
    }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res() res: Response) {
        const result = await this.authService.login(req.user);
        return res.json({
            accessToken: result.accessToken,
            refreshToken: result.refreshToken
        });
    }
    @Roles(['admin'])
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('test')
    async test(@Request() req, @Res() res: Response) {
        return res.json({
            message: 'success'
        })
    }
    @Roles(['admin'])
    @UseGuards(JwtRefreshTokenGuard, RolesGuard)
    @Post('refresh')
    async renewhAccessToken(@Request() req, @Res() res: Response) {
        const accessToken = this.authService.generateAccessToken(req.user);
        return res.json({
            accessToken,
        })
    }
    @Post('send-email')
    async sendEmail() {
        const mail = {
            to: 'nguyenquoctien2401@gmail.com',
            subject: 'Hello from sendgrid',
            from: 'nguyenquoctien2401@gmail.com',
            text: 'Hello',
            html: '<h1>Hello</h1>',
        };
        return await this.authService.send(mail);
    }
}