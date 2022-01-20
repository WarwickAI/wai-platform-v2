import { MyContext } from "../types";
import { Arg, Ctx, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { isAuth, isExec } from "../isAuth";
import { Talk } from "../entities/Talk";
import { User } from "../entities/User";
import { EventResponse } from "../entities/Event";
import { EventInput } from "../utils/EventInput";

@Resolver()
export class TalkResolver {
    @Query(() => [Talk])
  async talks(): Promise<Talk[]> {
    return await Talk.findWithoutUsers({ display: true })
  }

  @Query(() => [Talk])
  @UseMiddleware(isAuth, isExec)
  async allTalks(): Promise<Talk[]> {
    return await Talk.findWithoutUsers({});
  }

  @Query(() => Talk, { nullable: true })
  async talkByShortName(
    @Arg("shortName") shortName: string
  ): Promise<Talk | undefined> {
    return await Talk.findOneWithoutUsers({ shortName });
  }

  @Mutation(() => EventResponse)
  @UseMiddleware(isAuth, isExec)
  async createTalk(
    @Arg("eventInfo") talkInfo: EventInput
  ): Promise<EventResponse> {
    return await Talk.validateAndCreate(talkInfo);
  }

  @Mutation(() => EventResponse)
  @UseMiddleware(isAuth, isExec)
  async editTalk(
    @Arg("id") id: number,
    @Arg("eventInfo") talkInfo: EventInput
  ): Promise<EventResponse> {
    return await Talk.validateAndEdit(id, talkInfo);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinTalk(
    @Ctx() { payload }: MyContext,
    @Arg("talkId", { nullable: true }) talkId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<Boolean> {
    return Talk.joinEvent(talkId, shortName, parseInt(payload!.userId));
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isExec)
  async removeUserFromTalk(
    @Arg("userId") userId: number,
    @Arg("talkId", { nullable: true }) talkId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    return Talk.removeUserFromEvent(talkId, shortName, userId);
  }

  @Query(() => [User])
  @UseMiddleware(isAuth, isExec)
  async talkUsers(
    @Arg("talkId", { nullable: true }) talkId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    return Talk.getEventUsers(talkId, shortName);
  }
}