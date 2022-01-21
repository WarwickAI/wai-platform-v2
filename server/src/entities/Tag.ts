import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Course } from "./Course";
import { Event } from "./Event";
import { Project } from "./Project";
import { Talk } from "./Talk";
import { Tutorial } from "./Tutorial";

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
  @Column({ unique: true })
  title: string;

  @Field()
  @Column()
  color: string;

  @Field(() => [Project])
  @ManyToMany(() => Project, (project) => project.tags)
  projects: Project[];

  @Field(() => [Course])
  @ManyToMany(() => Course, (course) => course.tags)
  courses: Course[];

  @Field(() => [Talk])
  @ManyToMany(() => Talk, (talk) => talk.tags)
  talks: Talk[];

  @Field(() => [Tutorial])
  @ManyToMany(() => Tutorial, (tutorial) => tutorial.tags)
  tutorials: Tutorial[];
}
