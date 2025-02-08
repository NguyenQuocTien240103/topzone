import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guard/roles.guard';
import { JWTModule } from './JWT.module';
@Module({
  imports: [AuthModule, UserModule, PrismaModule, JWTModule],
  providers: [],
})
export class AppModule { }
