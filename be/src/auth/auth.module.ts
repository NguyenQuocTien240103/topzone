import { RolesGuard } from './guard/roles.guard';
import { LocalStrategy } from './strategy/local.strategy';
import { Module } from "@nestjs/common";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
@Module({
    imports: [PassportModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, LocalStrategy, RolesGuard, GoogleStrategy],
})
export class AuthModule { }