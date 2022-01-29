import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType() // Is now an Object Type also for GraphQL
export abstract class Event extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String) // Specify as field in GraphQL
  @CreateDateColumn() // Specify as row in DB
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
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

  @Field({ defaultValue: "" })
  @Column({ default: "" })
  description: string;

  @Field({ defaultValue: "" })
  @Column({ default: "" })
  previewImg: string;

  @Field({ defaultValue: "" })
  @Column({ default: "" })
  iconImg: string;

  @Field({ defaultValue: "" })
  @Column({ default: "" })
  coverImg: string;

  @Field({ defaultValue: "" })
  @Column({ default: "" })
  redirectUrl: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  joinable: boolean;
}

