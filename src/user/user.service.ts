import { Injectable } from '@nestjs/common';
import {UserCreateInput, UserCreateOutput} from "./dto/user-create.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./model/user.model";
import {UserUpdateInput, UserUpdateOutput} from "./dto/user-update.dto";
import {UserDeleteOutput} from "./dto/user-delete.dto";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}
    async createUser(input: UserCreateInput): Promise<UserCreateOutput> {

        input.password = await bcrypt.hash(input.password, 10);
        const newUser = this.userRepository.create(input);
        const user = await this.userRepository.save(newUser);
        return {user}
    }

    async updateUser(email: User['email'],
                     input: UserUpdateInput): Promise<UserUpdateOutput> {
        let user = await  this.userRepository.findOneOrFail({email});
        user.email = input.email;
        input.password = await bcrypt.hash(input.password, 10);
        user.firstName = input.firstName;
        user = await this.userRepository.save(user);
        return {user}
    }

    async deleteUser(email: User['email']): Promise<UserDeleteOutput> {
        let user = await this.userRepository.findOneOrFail({email});
        await this.userRepository.delete(user);
        return {userId: user.id}
    }

    async findOneByEmail(email: User['email']): Promise<User>{
        let user = await this.userRepository.findOneOrFail({email});
        return user;

    }
}
