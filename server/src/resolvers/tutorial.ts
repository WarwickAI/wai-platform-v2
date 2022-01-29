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
import { Tutorial } from "../entities/Tutorial";
import { isAuth, isExec } from "../isAuth";
import { User } from "../entities/User";
import { EventInput } from "../utils/EventInput";
import { getAndAddTags, removeUser, removeUsers } from "./event";
import { validateEvent } from "../utils/validateEvent";
import FieldError from "../utils/FieldError";
import { Tag } from "../entities/Tag";

@ObjectType()
export class TutorialResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field()
  tutorial?: Tutorial;
}

@Resolver()
export class TutorialResolver {
  @Query(() => [Tutorial])
  async tutorials(): Promise<Tutorial[]> {
    return removeUsers(await Tutorial.find({ where: { display: true }, relations: ["tags"] }));
  }

  @Query(() => [Tutorial])
  @UseMiddleware(isAuth, isExec)
  async allTutorials(): Promise<Tutorial[]> {
    return removeUsers(await Tutorial.find({relations: ["tags"]}));
  }

  @Query(() => Tutorial, { nullable: true })
  async tutorialByShortName(
    @Arg("shortName") shortName: string
  ): Promise<Tutorial | undefined> {
    const tutorial = await Tutorial.findOne({ shortName }, { relations: ["tags"] });
    if (!tutorial) return;
    return removeUser(tutorial);
  }

  @Mutation(() => TutorialResponse)
  @UseMiddleware(isAuth, isExec)
  async createTutorial(
    @Arg("tutorialInfo") tutorialInfo: EventInput
  ): Promise<TutorialResponse> {
    const errors = validateEvent(tutorialInfo);
    if (errors) {
      return { errors };
    }

    const { tags: newTagIDs, ...rest } = tutorialInfo;
    const tags: Tag[] = [];
    await Promise.all(newTagIDs.map(async tagId => {
      const foundTag = await Tag.findOne(tagId);
      if (foundTag) {
        tags.push(foundTag);
      }
    }));

    const tutorial = await Tutorial.create({ ...rest, tags }).save();
    return { tutorial };
  }

  @Mutation(() => TutorialResponse)
  @UseMiddleware(isAuth, isExec)
  async editTutorial(
    @Arg("id") id: number,
    @Arg("tutorialInfo") tutorialInfo: EventInput
  ): Promise<TutorialResponse> {
    const errors = validateEvent(tutorialInfo);
    if (errors) {
      return { errors };
    }

    const { tags: newTagIDs, ...rest } = tutorialInfo;

    const tags: Tag[] = [];
    await Promise.all(newTagIDs.map(async tagId => {
      const foundTag = await Tag.findOne(tagId);
      if (foundTag) {
        tags.push(foundTag);
      }
    }));

    await Tutorial.update(id, { ...rest });
    var tutorial = await Tutorial.findOne(id, { relations: ["tags"] });

    if (!tutorial) {
      return { errors: [{ field: "Tutorial ID", message: "No tutorial found" }] };
    }

    tutorial.tags = tags;
    tutorial = await tutorial.save();

    try {
      return { tutorial };
    } catch (e) {
      return { errors: [{ field: "Saving", message: e }] };
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinTutorial(
    @Ctx() { payload }: MyContext,
    @Arg("tutorialId", { nullable: true }) tutorialId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<Boolean> {
    const user = await User.findOne(payload!.userId, {
      relations: ["tutorials"],
    });
    if (!user) {
      return false;
    }

    const tutorial = await Tutorial.getByIdOrShortName(tutorialId, shortName, true);

    if (!tutorial || !tutorial.joinable) {
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
    const tutorial = await Tutorial.getByIdOrShortName(tutorialId, shortName, true);

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
    const tutorial = await Tutorial.getByIdOrShortName(tutorialId, shortName, true);

    if (!tutorial) {
      return [];
    }
    return tutorial.users;
  }
}