import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Event } from "./Event";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class Tag extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String) // Specify as field in GraphQL
    @CreateDateColumn() // Specify as row in DB
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    color: string;
}
