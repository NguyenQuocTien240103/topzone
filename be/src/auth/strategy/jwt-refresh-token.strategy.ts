import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh_token') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.refresh_token_secret,
            passReqToCallback: true,
        });
    }

    async validate(request: Request, payload: any) {
        // return await this.auth_service.getUserIfRefreshTokenMatched(
        //     payload.user_id,
        //     request.headers.authorization.split('Bearer ')[1],
        // );
    }
}
