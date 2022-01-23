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
import { Course } from "../entities/Course";
import { isAuth, isExec } from "../isAuth";
import { User } from "../entities/User";
import { EventInput } from "../utils/EventInput";
import { getAndAddTags, removeUser, removeUsers } from "./event";
import { validateEvent } from "../utils/validateEvent";
import FieldError from "../utils/FieldError";
import { Tag } from "../entities/Tag";

@ObjectType()
export class CourseResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field()
  course?: Course;
}

@Resolver()
export class CourseResolver {
  @Query(() => [Course])
  async courses(): Promise<Course[]> {
    return removeUsers(await Course.find({ where: { display: true }, relations: ["tags"] }));
  }

  @Query(() => [Course])
  @UseMiddleware(isAuth, isExec)
  async allCourses(): Promise<Course[]> {
    return removeUsers(await Course.find({ relations: ["tags"] }));
  }

  @Query(() => Course, { nullable: true })
  async courseByShortName(
    @Arg("shortName") shortName: string
  ): Promise<Course | undefined> {
    const course = await Course.findOne({ shortName }, { relations: ["tags"] });
    if (!course) return;
    return removeUser(course);
  }

  @Mutation(() => CourseResponse)
  @UseMiddleware(isAuth, isExec)
  async createCourse(
    @Arg("courseInfo") courseInfo: EventInput
  ): Promise<CourseResponse> {
    const errors = validateEvent(courseInfo);
    if (errors) {
      return { errors };
    }

    const { tags: newTagIDs, ...rest } = courseInfo;
    const tags: Tag[] = [];
    await Promise.all(newTagIDs.map(async tagId => {
      const foundTag = await Tag.findOne(tagId);
      if (foundTag) {
        tags.push(foundTag);
      }
    }));

    const course = await Course.create({ ...rest, tags }).save();
    return { course };
  }

  @Mutation(() => CourseResponse)
  @UseMiddleware(isAuth, isExec)
  async editCourse(
    @Arg("id") id: number,
    @Arg("courseInfo") courseInfo: EventInput
  ): Promise<CourseResponse> {
    const errors = validateEvent(courseInfo);
    if (errors) {
      return { errors };
    }

    const { tags: newTagIDs, ...rest } = courseInfo;

    const tags: Tag[] = [];
    await Promise.all(newTagIDs.map(async tagId => {
      const foundTag = await Tag.findOne(tagId);
      if (foundTag) {
        tags.push(foundTag);
      }
    }));

    await Course.update(id, { ...rest });
    var course = await Course.findOne(id, { relations: ["tags"] });

    if (!course) {
      return { errors: [{ field: "Course ID", message: "No course found" }] };
    }

    course.tags = tags;
    course = await course.save();

    try {
      return { course };
    } catch (e) {
      return { errors: [{ field: "Saving", message: e }] };
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinCourse(
    @Ctx() { payload }: MyContext,
    @Arg("courseId", { nullable: true }) courseId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<Boolean> {
    const user = await User.findOne(payload!.userId, {
      relations: ["courses"],
    });
    if (!user) {
      return false;
    }

    const course = await Course.getByIdOrShortName(courseId, shortName, true);

    if (!course || !course.joinable) {
      return false;
    }

    try {
      course.users.push(user);
      course.save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isExec)
  async removeUserFromCourse(
    @Arg("userId") userId: number,
    @Arg("courseId", { nullable: true }) courseId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    const course = await Course.getByIdOrShortName(courseId, shortName, true);

    if (!course) {
      return false;
    }

    const userIndex = course.users.findIndex((us) => us.id === userId);
    if (userIndex === -1) {
      return false;
    }

    course.users.splice(userIndex, 1);
    course.save();

    return true;
  }

  @Query(() => [User])
  @UseMiddleware(isAuth, isExec)
  async courseUsers(
    @Arg("courseId", { nullable: true }) courseId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    const course = await Course.getByIdOrShortName(courseId, shortName, true);

    if (!course) {
      return [];
    }
    return course.users;
  }
}