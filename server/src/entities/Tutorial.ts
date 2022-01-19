import { Field, ObjectType } from "type-graphql";
import { Entity, JoinTable, ManyToMany } from "typeorm";
import { Event } from "./Event";
import { User } from "./User";


@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class Tutorial extends Event {
    @Field(() => [User])
    @ManyToMany(() => User, user => user.tutorials, { cascade: true })
    @JoinTable()
    users: User[]

    static async joinEvent(eventId?: number, shortName?: string, userId?: number) {
        const user = await User.findOne(userId, {
            relations: ["tutorials"],
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
