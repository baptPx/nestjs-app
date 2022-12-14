import {User} from "../model/user.model";

export class UserCreateInput {
    email: string;
    password: string;
    firstName: string;
}

export class UserCreateOutput {
    user: User
}