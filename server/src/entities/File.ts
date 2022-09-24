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

  @Field()
  @Column({ unique: true })
  fileHash: string;

  @Field()
  @Column()
  isImage: boolean;

  // In pixels
  @Field({ nullable: true })
  @Column({ nullable: true })
  imgWidth: number;

  // In pixels
  @Field({ nullable: true })
  @Column({ nullable: true })
  imgHeight: number;
}
