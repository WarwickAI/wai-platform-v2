import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class Project extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)  // Specify as field in GraphQL
    @CreateDateColumn() // Specify as row in DB
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => Boolean, { defaultValue: false })
    @Column()
    display!: boolean;

    @Field(() => String)
    @Column()
    title!: String;

    @Field(() => String)
    @Column()
    shortName!: String;

    @Field(() => String)
    @Column()
    description: String;

    @Field(() => String)
    @Column()
    difficulty: String;

    @Field(() => String)
    @Column()
    cover: String;

    @Field(() => String, { nullable: true })
    @Column({ nullable: true })
    redirect: String;
}
