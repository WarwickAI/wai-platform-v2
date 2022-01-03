import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./Project";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class User extends BaseEntity {
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
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ unique: true })
  cognitoUsername: string;

  @Field()
  @Column()
  tokenVersion: number = 0;

  @Field()
  @Column()
  role: string = "none";

  @Field(() => [Project])
  @ManyToMany(() => Project, { cascade: true })
  @JoinTable()
  projects: Project[]
}
