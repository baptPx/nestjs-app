import {UserService} from "../user.service";
import {UserCreateInput, UserCreateOutput} from "../dto/user-create.dto";
import {UserUpdateInput, UserUpdateOutput} from "../dto/user-update.dto";
import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";

@Controller('users')
export class UserController {
    constructor(private readonly  userService: UserService) {}

    @Post()
    async createUser(@Body() input: UserCreateInput): Promise<UserCreateOutput> {
        return this.userService.createUser(input);
    }


    @Put(':userId')
    @UseGuards(AuthGuard('jwt'))
    async updateUser(
        @Param('userId') userId: string,
        @Body() input: UserUpdateInput) {
        return this.userService.updateUser(userId, input)
    }

    @Delete(':userId')
    @UseGuards(AuthGuard('jwt'))
    async deleteUser(@Param('userId') userId: string) {
        return this.userService.deleteUser(userId)
    }
}