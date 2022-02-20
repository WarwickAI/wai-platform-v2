import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Badge } from "./Badge";
import { Course } from "./Course";
import { Project } from "./Project";
import { RoleApplication } from "./RoleApplication";
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
  @ManyToMany(() => Project, (project) => project.users)
  projects: Project[];

  @Field(() => [Talk])
  @ManyToMany(() => Talk, (project) => project.users)
  talks: Talk[];

  @Field({ defaultValue: false })
  @Column({ default: false })
  isMember: boolean;

  @Field(() => String, { defaultValue: new Date() })
  @Column({ default: new Date() })
  memberFromDate: Date;

  @Field(() => [Course])
  @ManyToMany(() => Course, (course) => course.users)
  courses: Course[];

  @Field(() => [Tutorial])
  @ManyToMany(() => Tutorial, (tutorial) => tutorial.users)
  tutorials: Tutorial[];

  @Field(() => [RoleApplication])
  @OneToMany(() => RoleApplication, (application) => application.user)
  applications: RoleApplication[];

  @Field(() => [Badge])
  @ManyToMany(() => Badge, (badge) => badge.users)
  badges: Badge[];

  static async getByIdOrEmail(
    userId?: number,
    userEmail?: string,
    relations: string[] = []
  ) {
    console.log(relations)
    if (userId) {
      return await this.findOne(
        userId,
        relations.length > 0 ? { relations } : {}
      );
    } else if (userEmail) {
      return await this.findOne(
        { email: userEmail },
        relations.length > 0
          ? {
              relations,
            }
          : {}
      );
    } else {
      return undefined;
    }
  }
}
