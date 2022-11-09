import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class AuthLoginOutput {
    @Field(() => String)
    access_token: string;
}