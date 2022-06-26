import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Element } from "./Element";
import { User } from "./User";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class Group extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String) // Specify as field in GraphQL
  @CreateDateColumn() // Specify as row in DB
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable()
  users: User[];

  @Field(() => [Element])
  @ManyToMany(() => Element, (element) => element.canEditGroups)
  @JoinTable()
  canEditElements: Element[];

  @Field(() => [Element])
  @ManyToMany(() => Element, (element) => element.canViewGroups)
  @JoinTable()
  canViewElements: Element[];

  @Field(() => [Element])
  @ManyToMany(() => Element, (element) => element.canInteractGroups)
  @JoinTable()
  canInteractElements: Element[];
}
