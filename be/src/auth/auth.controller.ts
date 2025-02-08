import { Roles } from './decorator/roles.decorator';
import { Controller, Get, ParseIntPipe, Post, Param, ValidationPipe, Body, UseGuards, Request, UsePipes, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";
import { LocalAuthGuard } from "./guard/local-auth.guard";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { Response } from 'express';
import { RolesGuard } from "./guard/roles.guard";
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    // @UsePipes(new ValidationPipe())
    @Post('register')
    register(@Body() authDto: AuthDto) {
        return this.authService.register(authDto);
    }
    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req, @Res() res: Response) {
        const result = await this.authService.login(req.user);
        res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true, // Ngăn JavaScript truy cập cookie (bảo mật)
            sameSite: 'strict', // Giảm nguy cơ tấn công CSRF
            maxAge: 7 * 24 * 3600 * 1000, // Hạn sử dụng 7 ngày
        });
        return res.json({
            accessToken: result.accessToken,
        });
    }
    @Roles(['admin'])
    // @UseGuards(RolesGuard)   
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('test')
    async test(@Request() req, @Res() res: Response) {
        // console.log(req.cookies.refreshToken);
        console.log(req.user);
        return 'success';
    }

}