import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { TalkInput } from "../utils/TalkInput";
import { validateTalk } from "../utils/validateTalk";
import { isAuth, isExec } from "../isAuth";
import { Talk } from "../entities/Talk";
import FieldError from "../utils/FieldError";

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
}