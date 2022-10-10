import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Element } from "./Element";
import { Group } from "./Group";
import { File } from "./File";
import { Badge } from "./Badge";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column({ unique: true, nullable: true })
  uniId?: number;

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

  @Field({ defaultValue: false })
  @Column({ default: false })
  isMember: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  memberFromDate?: Date;

  @Field(() => [Element])
  @OneToMany(() => Element, (element) => element.createdBy)
  elements: Element[];

  @Field(() => [Group])
  @ManyToMany(() => Group, (group) => group.users)
  groups: Group[];

  @Field(() => Element, { nullable: true })
  @OneToOne(() => Element, (page) => page.user, { nullable: true })
  @JoinColumn()
  page: Element;

  @Field(() => Element, { nullable: true })
  @OneToMany(() => Element, (page) => page.user, { nullable: true })
  files: File;

  @Field(() => [Badge], { defaultValue: [] })
  @ManyToMany(() => Badge, (badge) => badge.users)
  badges: Badge[];
}
