import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field(() => String)
    @Column({ unique: true })
    email: string;

    @Field(() => String)
    @Column()
    password: string;

    @Field(() => String)
    @Column()
    firstName: string;
}