import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";
import {User} from "../user/model/user.model";
import { JwtService } from '@nestjs/jwt';
import {AuthLoginOutput} from "./dto/auth-dto";

export interface JWTPayload {
    id: string;
    email: string;
    firstName: string;
}
@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(username);
        if(user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user: User): Promise<AuthLoginOutput> {
        const payload: JWTPayload = {
            id: user.id,
            email: user.email,
            firstName: user.firstName
        }
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
}
