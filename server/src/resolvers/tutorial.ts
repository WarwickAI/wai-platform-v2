import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Tutorial } from "../entities/Tutorial";
import { isAuth, isExec } from "../isAuth";
import { User } from "../entities/User";
import { EventResponse } from "../entities/Event";
import { EventInput } from "../utils/EventInput";

@Resolver()
export class TutorialResolver {
  @Query(() => [Tutorial])
  async tutorials(): Promise<Tutorial[]> {
    return await Tutorial.findWithoutUsers({ display: true })
  }

  @Query(() => [Tutorial])
  @UseMiddleware(isAuth, isExec)
  async allTutorials(): Promise<Tutorial[]> {
    return await Tutorial.findWithoutUsers({});
  }

  @Query(() => Tutorial, { nullable: true })
  async tutorialByShortName(
    @Arg("shortName") shortName: string
  ): Promise<Tutorial | undefined> {
    return await Tutorial.findOneWithoutUsers({ shortName });
  }

  @Mutation(() => EventResponse)
  @UseMiddleware(isAuth, isExec)
  async createTutorial(
    @Arg("eventInfo") tutorialInfo: EventInput
  ): Promise<EventResponse> {
    return await Tutorial.validateAndCreate(tutorialInfo);
  }

  @Mutation(() => EventResponse)
  @UseMiddleware(isAuth, isExec)
  async editTutorial(
    @Arg("id") id: number,
    @Arg("eventInfo") tutorialInfo: EventInput
  ): Promise<EventResponse> {
    return await Tutorial.validateAndEdit(id, tutorialInfo);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinTutorial(
    @Ctx() { payload }: MyContext,
    @Arg("tutorialId", { nullable: true }) tutorialId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<Boolean> {
    return Tutorial.joinEvent(tutorialId, shortName, parseInt(payload!.userId));
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isExec)
  async removeUserFromTutorial(
    @Arg("userId") userId: number,
    @Arg("tutorialId", { nullable: true }) tutorialId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    return Tutorial.removeUserFromEvent(tutorialId, shortName, userId);
  }

  @Query(() => [User])
  @UseMiddleware(isAuth, isExec)
  async tutorialUsers(
    @Arg("tutorialId", { nullable: true }) tutorialId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    return Tutorial.getEventUsers(tutorialId, shortName);
  }
}