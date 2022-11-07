import {Args, Context, Resolver} from "@nestjs/graphql";
import {AuthService} from "./auth.service";
import {UseGuards} from "@nestjs/common";
import {LocalAuthGuard} from "./guards/local-auth.guard";

@Resolver()
export class AuthMutationResolver {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    async authLogin(
        @Context('req') req,
        @Args('username') _username: string,
        @Args('password') _password: string,
    ) {
        return this.authService.validateUser(_username, _password);
    }
}