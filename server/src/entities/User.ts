import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Course } from "./Course";
import { Project } from "./Project";
import { Talk } from "./Talk";
import { Tutorial } from "./Tutorial";

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
  @ManyToMany(() => Project, project => project.users)
  projects: Project[]

  @Field(() => [Talk])
  @ManyToMany(() => Talk, project => project.users)
  talks: Talk[]

  @Field(() => [Course])
  @ManyToMany(() => Course, course => course.users)
  courses: Course[]

  @Field(() => [Tutorial])
  @ManyToMany(() => Tutorial, tutorial => tutorial.users)
  tutorials: Tutorial[]
}
