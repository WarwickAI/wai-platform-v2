import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Project } from "../entities/Project";
import { isAuth, isExec } from "../isAuth";
import { User } from "../entities/User";
import { EventResponse } from "../entities/Event";
import { EventInput } from "../utils/EventInput";

@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  async projects(): Promise<Project[]> {
    return await Project.findWithoutUsers({ display: true })
  }

  @Query(() => [Project])
  @UseMiddleware(isAuth, isExec)
  async allProjects(): Promise<Project[]> {
    return await Project.findWithoutUsers({});
  }

  @Query(() => Project, { nullable: true })
  async projectByShortName(
    @Arg("shortName") shortName: string
  ): Promise<Project | undefined> {
    return await Project.findOneWithoutUsers({ shortName });
  }

  @Mutation(() => EventResponse)
  @UseMiddleware(isAuth, isExec)
  async createProject(
    @Arg("eventInfo") projectInfo: EventInput
  ): Promise<EventResponse> {
    return await Project.validateAndCreate(projectInfo);
  }

  @Mutation(() => EventResponse)
  @UseMiddleware(isAuth, isExec)
  async editProject(
    @Arg("id") id: number,
    @Arg("eventInfo") projectInfo: EventInput
  ): Promise<EventResponse> {
    return await Project.validateAndEdit(id, projectInfo);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinProject(
    @Ctx() { payload }: MyContext,
    @Arg("projectId", { nullable: true }) projectId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<Boolean> {
    return Project.joinEvent(projectId, shortName, parseInt(payload!.userId));
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isExec)
  async removeUserFromProject(
    @Arg("userId") userId: number,
    @Arg("projectId", { nullable: true }) projectId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    return Project.removeUserFromEvent(projectId, shortName, userId);
  }

  @Query(() => [User])
  @UseMiddleware(isAuth, isExec)
  async projectUsers(
    @Arg("projectId", { nullable: true }) projectId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    return Project.getEventUsers(projectId, shortName);
  }
}