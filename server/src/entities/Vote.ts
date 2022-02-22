import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ElectionRole } from "./ElectionRole";
import { RoleApplication } from "./RoleApplication";
import { User } from "./User";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class Vote extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @CreateDateColumn()
  updatedAt: Date;

  @Field(() => ElectionRole)
  @ManyToOne(() => ElectionRole, (role) => role.votes)
  role: ElectionRole;

  @Field(() => RoleApplication)
  @ManyToOne(() => RoleApplication, (application) => application.votes)
  application: RoleApplication;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.votes)
  user: User;
}
