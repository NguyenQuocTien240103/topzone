import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { AuthService } from '../auth.service';
@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh_token') {
    constructor(private authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.refreshTokenSecret,
            passReqToCallback: true,
        });
    }
    async validate(request: Request, payload: any) {
        const user = await this.authService.getUserIfRefreshTokenMatched(
            payload.sub,
            request.headers.authorization.split('Bearer ')[1],
        );
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
