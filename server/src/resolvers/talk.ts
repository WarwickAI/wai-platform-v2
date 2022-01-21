import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Talk } from "../entities/Talk";
import { isAuth, isExec } from "../isAuth";
import { User } from "../entities/User";
import { EventInput } from "../utils/EventInput";
import { getAndAddTags, removeUser, removeUsers } from "./event";
import { validateEvent } from "../utils/validateEvent";
import FieldError from "../utils/FieldError";

@ObjectType()
export class TalkResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field()
  talk?: Talk;
}

@Resolver()
export class TalkResolver {
  @Query(() => [Talk])
  async talks(): Promise<Talk[]> {
    return removeUsers(await Talk.find({ where: { display: true }, relations: ["tags"] }));
  }

  @Query(() => [Talk])
  @UseMiddleware(isAuth, isExec)
  async allTalks(): Promise<Talk[]> {
    return removeUsers(await Talk.find({relations: ["tags"]}));
  }

  @Query(() => Talk, { nullable: true })
  async talkByShortName(
    @Arg("shortName") shortName: string
  ): Promise<Talk | undefined> {
    const talk = await Talk.findOne({ shortName }, { relations: ["tags"] });
    if (!talk) return;
    return removeUser(talk);
  }

  @Mutation(() => TalkResponse)
  @UseMiddleware(isAuth, isExec)
  async createTalk(
    @Arg("talkInfo") talkInfo: EventInput
  ): Promise<TalkResponse> {
    const errors = validateEvent(talkInfo);
    if (errors) {
      return { errors };
    }
    const { tags: inputTags, ...rest } = talkInfo;
    const tags = getAndAddTags(inputTags, "talks");
    const newTalk = await Talk.create(rest).save();
    const talk = await Talk.findOne(newTalk.id);
    if (!talk) {
      return { errors: [{ field: "Talk ID", message: "No talk found" }] };
    }
    talk.tags = tags;
    await talk.save();
    return { talk };
  }

  @Mutation(() => TalkResponse)
  @UseMiddleware(isAuth, isExec)
  async editTalk(
    @Arg("id") id: number,
    @Arg("talkInfo") talkInfo: EventInput
  ): Promise<TalkResponse> {
    const errors = validateEvent(talkInfo);
    if (errors) {
      return { errors };
    }

    const { tags: inputTags, ...rest } = talkInfo;
    await Talk.update(id, rest);
    const talk = await Talk.findOne(id, { relations: ["tags"] });

    if (!talk) {
      return { errors: [{ field: "Talk ID", message: "No talk found" }] };
    }

    try {
      const tags = getAndAddTags(inputTags, "talks");
      talk.tags = tags;
      await talk.save();
      return { talk };
    } catch (e) {
      return { errors: [{ field: "Saving", message: e }] }
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinTalk(
    @Ctx() { payload }: MyContext,
    @Arg("talkId", { nullable: true }) talkId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<Boolean> {
    const user = await User.findOne(payload!.userId, {
      relations: ["talks"],
    });
    if (!user) {
      return false;
    }

    const talk = await Talk.getByIdOrShortName(talkId, shortName, true);

    if (!talk || !talk.joinable) {
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
    const talk = await Talk.getByIdOrShortName(talkId, shortName, true);

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
    const talk = await Talk.getByIdOrShortName(talkId, shortName, true);

    if (!talk) {
      return [];
    }
    return talk.users;
  }
}