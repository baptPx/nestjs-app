import {UserService} from "../user.service";
import {Args, ID, Mutation, Resolver} from "@nestjs/graphql";
import {UserCreateInput, UserCreateOutput} from "../dto/user-create.dto";
import {User} from "../model/user.model";
import {UserUpdateInput, UserUpdateOutput} from "../dto/user-update.dto";
import {UserDeleteOutput} from "../dto/user-delete.dto";

@Resolver(User)
export class UserMutationResolver {
    constructor(private readonly  userService: UserService) {}

    @Mutation(() => UserCreateOutput)
    async createUser(
        @Args('input') input: UserCreateInput
    ) {
        return this.userService.createUser(input);
    }

    @Mutation(() => UserUpdateOutput)
    async updateUser(
        @Args({name: 'userId', type: () => ID}) userId: User['id'],
        @Args('input') input: UserUpdateInput) {
        return this.userService.updateUser(userId, input)
    }

    @Mutation(() => UserDeleteOutput)
    async deleteUser(
        @Args({name: 'userId', type: () => ID}) userId: User['id']) {
        return this.userService.deleteUser(userId)
    }
}