import { PrimaryKey, Property, Entity } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class Project {
    @Field()
    @PrimaryKey()
    _id!: number;

    @Field(() => String)  // Specify as field in GraphQL
    @Property({ type: "date" }) // Specify as row in DB
    createdAt: Date = new Date();

    @Field(() => String)
    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Field()
    @Property()
    display: Boolean = false;

    @Field(() => String)
    @Property({ type: "text" })
    title!: String;

    @Field(() => String)
    @Property({ type: "text" })
    shortName!: String;

    @Field(() => String)
    @Property({ type: "text" })
    description: String;

    @Field(() => String)
    @Property({ type: "text" })
    difficulty: String;

    @Field(() => String)
    @Property({ type: "text" })
    cover: String;
}
