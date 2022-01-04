import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { TalkInput } from "../utils/TalkInput";
import { validateTalk } from "../utils/validateTalk";
import { isAuth, isExec } from "../isAuth";
import { Talk } from "../entities/Talk";
import FieldError from "../utils/FieldError";
import { User } from "../entities/User";

@ObjectType()
class TalkResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Talk, { nullable: true })
    talk?: Talk;
}

@Resolver()
export class TalkResolver {
    @Query(() => [Talk])
    async talks(): Promise<Talk[]> {
        return Talk.find({ display: true });
    }

    @Query(() => [Talk])
    @UseMiddleware(isAuth, isExec)
    async allTalks(): Promise<Talk[]> {
        return Talk.find();
    }

    @Query(() => Talk, { nullable: true })
    async talkByShortName(
        @Arg("shortName") shortName: string
    ): Promise<Talk | undefined> {
        return Talk.findOne({ shortName })
    }

    @Mutation(() => TalkResponse)
    @UseMiddleware(isAuth, isExec)
    async createTalk(
        @Arg("talkInfo") talkInfo: TalkInput
    ): Promise<TalkResponse> {
        const errors = validateTalk(talkInfo);
        if (errors) {
            return { errors };
        }
        const talk = await Talk.create(talkInfo).save();
        return { talk };
    }

    @Mutation(() => TalkResponse)
    @UseMiddleware(isAuth, isExec)
    async editTalk(
        @Arg("id") id: number,
        @Arg("talkInfo") talkInfo: TalkInput
    ): Promise<TalkResponse> {
        const errors = validateTalk(talkInfo);
        if (errors) {
            return { errors };
        }
        await Talk.update(id, talkInfo);
        const talk = await Talk.findOne(id);
        return { talk };
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async joinTalk(
        @Ctx() { payload }: MyContext,
        @Arg("talkId", { nullable: true }) talkId?: number,
        @Arg("shortName", { nullable: true }) shortName?: string
    ): Promise<Boolean> {
        const user = await User.findOne(payload?.userId, {
            relations: ["talks"],
        });
        if (!user) {
            return false;
        }

        const talk = await getTalkByIdOrName(talkId, shortName, true);

        if (!talk || !talk.joinButton) {
            return false;
        }

        try {
            talk.users.push(user);
            talk.save();
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth, isExec)
    async removeUserFromTalk(
        @Arg("userId") userId: number,
        @Arg("talkId", { nullable: true }) talkId?: number,
        @Arg("shortName", { nullable: true }) shortName?: string
    ) {

        const talk = await getTalkByIdOrName(talkId, shortName, true);

        if (!talk) {
            return false;
        }

        const userIndex = talk.users.findIndex((us) => us.id === userId);
        if (userIndex === -1) {
            return false;
        }

        talk.users.splice(userIndex, 1);
        talk.save();

        return true;
    }

    @Query(() => [User])
    @UseMiddleware(isAuth, isExec)
    async talkUsers(
        @Arg("talkId", { nullable: true }) talkId?: number,
        @Arg("shortName", { nullable: true }) shortName?: string
    ) {
        const talk = await getTalkByIdOrName(talkId, shortName, true);

        if (!talk) {
            return [];
        }
        return talk.users;
    }
}

const getTalkByIdOrName = async (talkId?: number, shortName?: string, relations?: boolean) => {
    if (talkId) {
        return await Talk.findOne(talkId, relations ? { relations: ["users"] } : {});
    } else if (shortName) {
        return await Talk.findOne({ shortName }, relations ? { relations: ["users"] } : {});
    } else {
        return undefined;
    }
}