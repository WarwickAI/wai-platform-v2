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
import { RoleApplication } from "./RoleApplication";
import { Vote } from "./Vote";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class ElectionRole extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @CreateDateColumn()
  updatedAt: Date;

  @Field({ defaultValue: false })
  @Column()
  display: boolean;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ unique: true })
  shortName: string;

  @Field()
  @Column()
  description: string;

  @Field({ defaultValue: "" })
  @Column({ default: "" })
  applicationTemplate: string;

  @Field({ defaultValue: "" })
  @Column({ default: "" })
  previewImg: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  canApply: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  canVote: boolean;

  @Field(() => [RoleApplication])
  @OneToMany(() => RoleApplication, (application) => application.role)
  applications: RoleApplication[];

  @Field(() => [Vote])
  @OneToMany(() => Vote, (vote) => vote.role)
  votes: Vote[];

  static async getByIdOrShortName(
    roleId?: number,
    shortName?: string,
    relations: string[] = []
  ) {
    if (roleId) {
      return await this.findOne(roleId, { relations: relations });
    } else if (shortName) {
      return await this.findOne({ shortName }, { relations: relations });
    } else {
      return undefined;
    }
  }
}
