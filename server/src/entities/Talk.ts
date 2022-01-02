import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class Talk extends BaseEntity {
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
    cover: string;

    @Field()
    @Column({ default: '' })
    redirect: String;
}
