
import { Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { oAuthConstants } from '../constants';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            clientID: oAuthConstants.clientId,
            clientSecret: oAuthConstants.clientSecret,
            callbackURL: oAuthConstants.callbackUrl,
            scope: ['profile', 'email'],
        });

    }
    async validate(accessToken: string, refreshToken: string, profile: any, cd: any) {
        console.log({ profile });
    }
}
