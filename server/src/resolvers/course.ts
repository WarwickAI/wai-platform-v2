import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Course } from "../entities/Course";
import { isAuth, isExec } from "../isAuth";
import { User } from "../entities/User";
import { EventInput } from "../utils/EventInput";
import { EventResponse } from "../entities/Event";

@Resolver()
export class CourseResolver {
  @Query(() => [Course])
  async courses(): Promise<Course[]> {
    return await Course.findWithoutUsers({ display: true })
  }

  @Query(() => [Course])
  @UseMiddleware(isAuth, isExec)
  async allCourses(): Promise<Course[]> {
    return await Course.findWithoutUsers({});
  }

  @Query(() => Course, { nullable: true })
  async courseByShortName(
    @Arg("shortName") shortName: string
  ): Promise<Course | undefined> {
    return await Course.findOneWithoutUsers({ shortName });
  }

  @Mutation(() => EventResponse)
  @UseMiddleware(isAuth, isExec)
  async createCourse(
    @Arg("eventInfo") courseInfo: EventInput
  ): Promise<EventResponse> {
    return await Course.validateAndCreate(courseInfo);
  }

  @Mutation(() => EventResponse)
  @UseMiddleware(isAuth, isExec)
  async editCourse(
    @Arg("id") id: number,
    @Arg("eventInfo") courseInfo: EventInput
  ): Promise<EventResponse> {
    return await Course.validateAndEdit(id, courseInfo);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinCourse(
    @Ctx() { payload }: MyContext,
    @Arg("courseId", { nullable: true }) courseId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<Boolean> {
    return Course.joinEvent(courseId, shortName, parseInt(payload!.userId));
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isExec)
  async removeUserFromCourse(
    @Arg("userId") userId: number,
    @Arg("courseId", { nullable: true }) courseId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    return Course.removeUserFromEvent(courseId, shortName, userId);
  }

  @Query(() => [User])
  @UseMiddleware(isAuth, isExec)
  async courseUsers(
    @Arg("courseId", { nullable: true }) courseId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    return Course.getEventUsers(courseId, shortName);
  }
}