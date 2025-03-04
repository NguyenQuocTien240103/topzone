import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { RolesGuard } from './guard';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtRefreshTokenStrategy, GoogleStrategy, JwtStrategy, LocalStrategy } from './strategy';
@Module({
    imports: [PassportModule.register({ defaultStrategy: 'refresh_token' }), JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy, RolesGuard, GoogleStrategy, JwtRefreshTokenStrategy],
})
export class AuthModule { }