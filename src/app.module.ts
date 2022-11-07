import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ApolloDriver, ApolloDriverConfig} from "@nestjs/apollo";
import {GraphQLModule} from "@nestjs/graphql";
import {ConfigModule, ConfigService} from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import {AppResolver} from "./app.resolver";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: 'schema.sql'
      }),
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
      AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}