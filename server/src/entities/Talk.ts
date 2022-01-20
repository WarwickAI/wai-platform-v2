import { EventInput } from "../utils/EventInput";
import { validateEvent } from "../utils/validateEvent";
import { Field, ObjectType } from "type-graphql";
import { Entity, JoinTable, ManyToMany } from "typeorm";
import { Event, EventResponse } from "./Event";
import { Tag } from "./Tag";
import { User } from "./User";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class Talk extends Event {
  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.talks, { cascade: true })
  @JoinTable()
  users: User[];

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.talks, { cascade: true })
  @JoinTable()
  tags: Tag[];

  static async validateAndCreate(
    eventInput: EventInput
  ): Promise<EventResponse> {
    const errors = validateEvent(eventInput);
    if (errors) {
      return { errors };
    }
    const event = await this.create(eventInput).save();
    return { event };
  }

  static async validateAndEdit(
    id: number,
    eventInput: EventInput
  ): Promise<EventResponse> {
    const errors = validateEvent(eventInput);
    if (errors) {
      return { errors };
    }
    await this.update(id, eventInput);
    const event = await this.findOne(id);
    return { event: event };
  }

  static async joinEvent(
    eventId?: number,
    shortName?: string,
    userId?: number
  ) {
    const user = await User.findOne(userId, {
      relations: ["talks"],
    });
    if (!user) {
      return false;
    }

    const event = await this.getEventByIdOrName(eventId, shortName, true);

    if (!event || !event.joinable) {
      return false;
    }

    try {
      event.users.push(user);
      event.save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
