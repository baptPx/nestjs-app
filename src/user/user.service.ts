import { Injectable } from '@nestjs/common';
import {UserCreateInput, UserCreateOutput} from "./dto/user-create.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./model/user.model";
import {UserUpdateInput, UserUpdateOutput} from "./dto/user-update.dto";
import {UserDeleteOutput} from "./dto/user-delete.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    async createUser(input: UserCreateInput): Promise<UserCreateOutput> {
        const newUser = this.userRepository.create(input);
        const user = await this.userRepository.save(newUser);
        return {user}
    }

    async updateUser(userId: User['id'],
                     input: UserUpdateInput): Promise<UserUpdateOutput> {
        let user = await  this.userRepository.findOneOrFail(userId);
        user.email = input.email;
        user.password = input.password;
        user.firstName = input.firstName;
        user = await this.userRepository.save(user);
        return {user}
    }

    async deleteUser(userId: User['id']): Promise<UserDeleteOutput> {
        let user = await this.userRepository.findOneOrFail(userId);
        await this.userRepository.delete(user);
        return {userId}
    }

    async findOneByEmail(email: User['email']): Promise<User>{
        let user = await this.userRepository.findOneOrFail({email});
        return user;

    }
}
