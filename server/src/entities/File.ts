import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class File extends BaseEntity {
  @Field()
  @PrimaryColumn()
  key: string;

  @Field(() => String)
  @CreateDateColumn()
  uploadedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.files)
  uploadedBy: User;

  @Field()
  @Column()
  fileName: string;

  @Field()
  @Column()
  fileType: string;

  // In bytes
  @Field()
  @Column()
  fileSize: number;
}
