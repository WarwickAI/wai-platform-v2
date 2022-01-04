import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Tutorial } from "../entities/Tutorial";
import { TutorialInput } from "../utils/TutorialInput";
import { validateTutorial } from "../utils/validateTutorial";
import { isAuth, isExec } from "../isAuth";
import FieldError from "../utils/FieldError";
import { User } from "../entities/User";

@ObjectType()
class TutorialResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Tutorial, { nullable: true })
  tutorial?: Tutorial;
}

@Resolver()
export class TutorialResolver {
  @Query(() => [Tutorial])
  async tutorials(): Promise<Tutorial[]> {
    var tutorials = await Tutorial.find({ display: true });
    tutorials.forEach((tutorial) => (tutorial.users = []));
    return tutorials;
  }

  @Query(() => [Tutorial])
  @UseMiddleware(isAuth, isExec)
  async allTutorials(): Promise<Tutorial[]> {
    return Tutorial.find();
  }

  @Query(() => Tutorial, { nullable: true })
  async tutorialByShortName(
    @Arg("shortName") shortName: string
  ): Promise<Tutorial | undefined> {
    const tutorial = await Tutorial.findOne({ shortName });
    if (!tutorial) {
      return undefined;
    }
    tutorial.users = [];
    return tutorial;
  }

  @Mutation(() => TutorialResponse)
  @UseMiddleware(isAuth, isExec)
  async createTutorial(
    @Arg("tutorialInfo") tutorialInfo: TutorialInput
  ): Promise<TutorialResponse> {
    const errors = validateTutorial(tutorialInfo);
    if (errors) {
      return { errors };
    }
    const tutorial = await Tutorial.create(tutorialInfo).save();
    return { tutorial };
  }

  @Mutation(() => TutorialResponse)
  @UseMiddleware(isAuth, isExec)
  async editTutorial(
    @Arg("id") id: number,
    @Arg("tutorialInfo") tutorialInfo: TutorialInput
  ): Promise<TutorialResponse> {
    const errors = validateTutorial(tutorialInfo);
    if (errors) {
      return { errors };
    }
    await Tutorial.update(id, tutorialInfo);
    const tutorial = await Tutorial.findOne(id);
    return { tutorial };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinTutorial(
    @Ctx() { payload }: MyContext,
    @Arg("tutorialId", { nullable: true }) tutorialId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<Boolean> {
    const user = await User.findOne(payload?.userId, {
      relations: ["tutorials"],
    });
    if (!user) {
      return false;
    }

    const tutorial = await getTutorialByIdOrName(tutorialId, shortName, true);

    if (!tutorial || !tutorial.joinButton) {
      return false;
    }

    try {
      tutorial.users.push(user);
      tutorial.save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isExec)
  async removeUserFromTutorial(
    @Arg("userId") userId: number,
    @Arg("tutorialId", { nullable: true }) tutorialId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {

    const tutorial = await getTutorialByIdOrName(tutorialId, shortName, true);

    if (!tutorial) {
      return false;
    }

    const userIndex = tutorial.users.findIndex((us) => us.id === userId);
    if (userIndex === -1) {
      return false;
    }

    tutorial.users.splice(userIndex, 1);
    tutorial.save();

    return true;
  }

  @Query(() => [User])
  @UseMiddleware(isAuth, isExec)
  async tutorialUsers(
    @Arg("tutorialId", { nullable: true }) tutorialId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    const tutorial = await getTutorialByIdOrName(tutorialId, shortName, true);

    if (!tutorial) {
      return [];
    }
    return tutorial.users;
  }
}

const getTutorialByIdOrName = async (tutorialId?: number, shortName?: string, relations?: boolean) => {
  if (tutorialId) {
    return await Tutorial.findOne(tutorialId, relations ? { relations: ["users"] } : {});
  } else if (shortName) {
    return await Tutorial.findOne({ shortName }, relations ? { relations: ["users"] } : {});
  } else {
    return undefined;
  }
}