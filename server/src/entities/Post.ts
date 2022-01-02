import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class Post extends BaseEntity {
  @Field()  
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)  // Specify as field in GraphQL
  @CreateDateColumn() // Specify as row in DB
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date = new Date();

  @Field()
  @Column()
  title: string;
}
