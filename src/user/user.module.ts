import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./model/user.model";
import {UserController} from "./controllers/user.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserController],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
