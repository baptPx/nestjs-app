import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {JwtModule} from "@nestjs/jwt";
import {AuthMutationResolver} from "./auth.mutation.resolver";
import {LocalStrategy} from "./strategies/local.strategy";

@Module({
  imports: [UserModule, PassportModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (ConfigService) => ({
          secret: ConfigService.get('JWT_SECRET'),
          signOptions: { expiresIn: '10m' }
        })
  })],
  providers: [AuthService, AuthMutationResolver, LocalStrategy]
})
export class AuthModule {}
