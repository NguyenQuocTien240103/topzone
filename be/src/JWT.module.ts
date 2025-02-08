import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Module } from '@nestjs/common';
import { jwtConstants } from "./auth/constants";
@Module({
    imports: [
        {
            ...JwtModule.registerAsync({
                imports: [ConfigModule],
                useFactory: async (configService: ConfigService) => ({
                    secretOrKeyProvider: () => (configService.get<string>(jwtConstants.secret)),
                }),
                inject: [ConfigService],
            }),
            global: true
        }
    ],
    exports: [JwtModule]
})
export class JWTModule { }