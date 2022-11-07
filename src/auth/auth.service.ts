import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UserService} from "../user/user.service";

@Injectable()
export class AuthService {
    constructor(private userService: UserService) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.findOneByEmail(username);
        if(user && user.password === password) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }
}
