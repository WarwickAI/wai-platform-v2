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
import { Course } from "../entities/Course";
import { CourseInput } from "../utils/CourseInput";
import { validateCourse } from "../utils/validateCourse";
import { isAuth, isExec } from "../isAuth";
import FieldError from "../utils/FieldError";
import { User } from "../entities/User";

@ObjectType()
class CourseResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Course, { nullable: true })
  course?: Course;
}

@Resolver()
export class CourseResolver {
  @Query(() => [Course])
  async courses(): Promise<Course[]> {
    var courses = await Course.find({ display: true });
    courses.forEach((course) => (course.users = []));
    return courses;
  }

  @Query(() => [Course])
  @UseMiddleware(isAuth, isExec)
  async allCourses(): Promise<Course[]> {
    return Course.find();
  }

  @Query(() => Course, { nullable: true })
  async courseByShortName(
    @Arg("shortName") shortName: string
  ): Promise<Course | undefined> {
    const course = await Course.findOne({ shortName });
    if (!course) {
      return undefined;
    }
    course.users = [];
    return course;
  }

  @Mutation(() => CourseResponse)
  @UseMiddleware(isAuth, isExec)
  async createCourse(
    @Arg("courseInfo") courseInfo: CourseInput
  ): Promise<CourseResponse> {
    const errors = validateCourse(courseInfo);
    if (errors) {
      return { errors };
    }
    const course = await Course.create(courseInfo).save();
    return { course };
  }

  @Mutation(() => CourseResponse)
  @UseMiddleware(isAuth, isExec)
  async editCourse(
    @Arg("id") id: number,
    @Arg("courseInfo") courseInfo: CourseInput
  ): Promise<CourseResponse> {
    const errors = validateCourse(courseInfo);
    if (errors) {
      return { errors };
    }
    await Course.update(id, courseInfo);
    const course = await Course.findOne(id);
    return { course };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinCourse(
    @Ctx() { payload }: MyContext,
    @Arg("courseId", { nullable: true }) courseId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<Boolean> {
    const user = await User.findOne(payload?.userId, {
      relations: ["courses"],
    });
    if (!user) {
      return false;
    }

    const course = await getCourseByIdOrName(courseId, shortName, true);

    if (!course || !course.joinButton) {
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

    const course = await getCourseByIdOrName(courseId, shortName, true);

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
    const course = await getCourseByIdOrName(courseId, shortName, true);

    if (!course) {
      return [];
    }
    return course.users;
  }
}

const getCourseByIdOrName = async (courseId?: number, shortName?: string, relations?: boolean) => {
  if (courseId) {
    return await Course.findOne(courseId, relations ? { relations: ["users"] } : {});
  } else if (shortName) {
    return await Course.findOne({ shortName }, relations ? { relations: ["users"] } : {});
  } else {
    return undefined;
  }
}