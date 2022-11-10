import {AuthService} from "./auth.service";
import {Request, Controller, Post, UseGuards, Body} from "@nestjs/common";
import {AuthLoginInput} from "./dto/auth-dto";
import {User} from "../user/model/user.model";
import {AuthGuard} from "@nestjs/passport";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async authLogin(@Body() req: AuthLoginInput) {
        let user: User = await this.authService.validateUser(req.username, req.password);
        return this.authService.login(user);
    }
}