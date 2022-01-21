import { Field, ObjectType } from "type-graphql";
import { Entity, JoinTable, ManyToMany } from "typeorm";
import { Event } from "./Event";
import { Tag } from "./Tag";
import { User } from "./User";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class Project extends Event {
  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.projects, { cascade: true })
  @JoinTable()
  users: User[];

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.projects, { cascade: true })
  @JoinTable()
  tags: Tag[];

  static async getByIdOrShortName(eventId?: number,
    shortName?: string,
    relations: boolean = false) {
    if (eventId) {
      return await this.findOne(eventId, relations ? { relations: ["users", "tags"] } : { relations: ["tags"] });
    } else if (shortName) {
      return await this.findOne(
        { shortName },
        relations ? { relations: ["users", "tags"] } : { relations: ["tags"] }
      );
    } else {
      return undefined;
    }
  }
}
