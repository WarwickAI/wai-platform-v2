import { PrimaryKey, Property, Entity } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class User {
  @Field()
  @PrimaryKey()
  _id!: number;

  @Field(() => String) // Specify as field in GraphQL
  @Property({ type: "date" }) // Specify as row in DB
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Field()
  @Property({ type: "text", unique: true })
  username!: string;

  // No field property since don't want it selected in GraphQL
  @Property({ type: "text" })
  password!: string;

  @Field()
  @Property()
  tokenVersion: number = 0;
}
