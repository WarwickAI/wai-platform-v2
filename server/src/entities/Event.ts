import { EventInput } from "../utils/EventInput";
import FieldError from "../utils/FieldError";
import { validateEvent } from "../utils/validateEvent";
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  FindOperator,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Tag } from "./Tag";

@ObjectType() // Is now an Object Type also for GraphQL
export class Event extends BaseEntity {
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

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  previewImg: string;

  @Field()
  @Column()
  iconImg: string;

  @Field()
  @Column()
  coverImg: string;

  @Field({ defaultValue: "" })
  @Column({ default: "" })
  redirectUrl: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  joinable: boolean;

  @Field(() => [User])
  users: User[];

  static async findWithoutUsers(findOpt: FindConditions<Event>) {
    var events = await this.getRepository().find({
      ...findOpt,
      relations: ["tags"],
    });
    events.forEach((event) => (event.users = []));
    return events;
  }

  static async findOneWithoutUsers(findCond: FindConditions<Event> = {}) {
    var event = await this.findOne({
      ...findCond,
      relations: ["tags"],
    });
    if (event) {
      event.users = [];
    }
    return event;
  }

  static async removeUserFromEvent(
    eventId?: number,
    shortName?: string,
    userId?: number
  ) {
    const event = await this.getEventByIdOrName(eventId, shortName, true);

    if (!event) {
      return false;
    }

    const userIndex = event.users.findIndex((us) => us.id === userId);
    if (userIndex === -1) {
      return false;
    }

    event.users.splice(userIndex, 1);
    event.save();

    return true;
  }

  static async getEventUsers(eventId?: number, shortName?: string) {
    const event = await this.getEventByIdOrName(eventId, shortName, true);

    if (!event) {
      return [];
    }
    return event.users;
  }

  static async getEventByIdOrName(
    eventId?: number,
    shortName?: string,
    relations?: boolean
  ) {
    if (eventId) {
      return await this.findOne(
        eventId,
        relations ? { relations: ["users", "tags"] } : { relations: ["tags"] }
      );
    } else if (shortName) {
      return await this.findOne(
        { shortName },
        relations ? { relations: ["users"] } : { relations: ["tags"] }
      );
    } else {
      return undefined;
    }
  }
}

@ObjectType()
export class EventResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field({ nullable: true })
  event?: Event;
}
