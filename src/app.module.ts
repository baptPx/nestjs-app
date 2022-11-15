import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OffModule } from './off/off.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.get('DATABASE_HOST'),
              port: parseInt(configService.get('DATABASE_PORT')),
              username: configService.get('DATABASE_USER'),
              password: configService.get('DATABASE_PASSWORD'),
              database: configService.get('DATABASE_DB'),
              entities: [join(__dirname, '**', '*.model.{ts,js}')],
              synchronize: true,
          })
      }),
      UserModule,
      AuthModule,
      OffModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
