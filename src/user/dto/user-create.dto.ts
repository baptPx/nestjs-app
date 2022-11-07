import {Field, InputType, ObjectType} from "@nestjs/graphql";
import {User} from "../model/user.model";

@InputType()
export class UserCreateInput {
    @Field(() => String)
    email: string;
    @Field(() => String)
    password: string;
    @Field(() => String)
    firstName: string;
}

@ObjectType()
export class UserCreateOutput {
    @Field(() => User)
    user: User

}