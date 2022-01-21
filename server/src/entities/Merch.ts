import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
class Variant {
  @Field(() => String)
  name: string;

  @Field(() => String)
  link: string;
}

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class Merch extends BaseEntity {
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
  @Column()
  shortName: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  image: string;

  @Field((_type) => [Variant])
  @Column("simple-json")
  variants: Variant[];
}
