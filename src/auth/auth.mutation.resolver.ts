import {Args, Context, Mutation, Resolver} from "@nestjs/graphql";
import {AuthService} from "./auth.service";
import {UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {AuthLoginOutput} from "./dto/auth-dto";
import {User} from "../user/model/user.model";

@Resolver()
export class AuthMutationResolver {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Mutation(() => AuthLoginOutput)
    async authLogin(
        @Context('req') req,
        @Args('username') _username: string,
        @Args('password') _password: string,
    ) {
        let user: User = await this.authService.validateUser(_username, _password);
        return this.authService.login(req.user);
    }
}