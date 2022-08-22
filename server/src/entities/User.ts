import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Course } from "./Course";
import { Project } from "./Project";
import { RoleApplication } from "./RoleApplication";
import { Talk } from "./Talk";
import { Tutorial } from "./Tutorial";
import { Vote } from "./Vote";
import { Element } from "./Element";
import { Group } from "./Group";

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

  @Field(() => [Project])
  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];

  @Field(() => [Talk])
  @ManyToMany(() => Talk, (project) => project.users)
  talks: Talk[];

  @Field({ defaultValue: false })
  @Column({ default: false })
  isMember: boolean;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  memberFromDate?: Date;

  @Field(() => [Course])
  @ManyToMany(() => Course, (course) => course.users)
  courses: Course[];

  @Field(() => [Tutorial])
  @ManyToMany(() => Tutorial, (tutorial) => tutorial.users)
  tutorials: Tutorial[];

  @Field(() => [RoleApplication])
  @OneToMany(() => RoleApplication, (application) => application.user)
  applications: RoleApplication[];

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vote) => vote.user)
  votes: Vote[];

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
}
