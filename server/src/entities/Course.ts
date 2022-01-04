import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";


@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class Course extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)  // Specify as field in GraphQL
    @CreateDateColumn() // Specify as row in DB
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field({ defaultValue: false })
    @Column()
    display: boolean;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    shortName: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    difficulty: string;

    @Field()
    @Column()
    cover: string;

    @Field()
    @Column({ default: '' })
    redirect: string;

    @Field({ defaultValue: false })
    @Column({ default: false })
    joinButton: boolean;

    @Field(() => [User])
    @ManyToMany(() => User, user => user.courses, { cascade: true })
    @JoinTable()
    users: User[]
}
