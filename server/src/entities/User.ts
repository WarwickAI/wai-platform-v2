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
  @Property({ type: "text" })
  firstName!: string;

  @Field()
  @Property({ type: "text" })
  lastName!: string;

  @Field()
  @Property({ type: "text", unique: true })
  email!: string;

  @Field()
  @Property({ type: "text", unique: true })
  cognitoUsername!: string;

  @Field()
  @Property()
  tokenVersion: number = 0;

  @Field()
  @Property({ type: "text" })
  role: string = "none";
}
