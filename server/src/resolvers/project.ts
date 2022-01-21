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
import { Project } from "../entities/Project";
import { isAuth, isExec } from "../isAuth";
import { User } from "../entities/User";
import { EventInput } from "../utils/EventInput";
import { getAndAddTags, removeUser, removeUsers } from "./event";
import { validateEvent } from "../utils/validateEvent";
import FieldError from "../utils/FieldError";

@ObjectType()
export class ProjectResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field()
  project?: Project;
}

@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  async projects(): Promise<Project[]> {
    return removeUsers(await Project.find({ where: { display: true }, relations: ["tags"] }));
  }

  @Query(() => [Project])
  @UseMiddleware(isAuth, isExec)
  async allProjects(): Promise<Project[]> {
    return removeUsers(await Project.find({ relations: ["tags"] }));
  }

  @Query(() => Project, { nullable: true })
  async projectByShortName(
    @Arg("shortName") shortName: string
  ): Promise<Project | undefined> {
    const project = await Project.findOne({ shortName }, { relations: ["tags"] });
    if (!project) return;
    return removeUser(project);
  }

  @Mutation(() => ProjectResponse)
  @UseMiddleware(isAuth, isExec)
  async createProject(
    @Arg("projectInfo") projectInfo: EventInput
  ): Promise<ProjectResponse> {
    const errors = validateEvent(projectInfo);
    if (errors) {
      return { errors };
    }
    const { tags: inputTags, ...rest } = projectInfo;
    const tags = getAndAddTags(inputTags, "projects");
    const newProject = await Project.create(rest).save();
    const project = await Project.findOne(newProject.id);
    if (!project) {
      return { errors: [{ field: "Project ID", message: "No project found" }] };
    }
    project.tags = tags;
    await project.save();
    return { project };
  }

  @Mutation(() => ProjectResponse)
  @UseMiddleware(isAuth, isExec)
  async editProject(
    @Arg("id") id: number,
    @Arg("projectInfo") projectInfo: EventInput
  ): Promise<ProjectResponse> {
    const errors = validateEvent(projectInfo);
    if (errors) {
      return { errors };
    }

    const { tags: inputTags, ...rest } = projectInfo;
    await Project.update(id, rest);
    const project = await Project.findOne(id, { relations: ["tags"] });

    if (!project) {
      return { errors: [{ field: "Project ID", message: "No project found" }] };
    }

    try {
      const tags = getAndAddTags(inputTags, "projects");
      project.tags = tags;
      await project.save();
      return { project };
    } catch (e) {
      return { errors: [{ field: "Saving", message: e }] }
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinProject(
    @Ctx() { payload }: MyContext,
    @Arg("projectId", { nullable: true }) projectId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<Boolean> {
    const user = await User.findOne(payload!.userId, {
      relations: ["projects"],
    });
    if (!user) {
      return false;
    }

    const project = await Project.getByIdOrShortName(projectId, shortName, true);

    if (!project || !project.joinable) {
      return false;
    }

    try {
      project.users.push(user);
      project.save();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isExec)
  async removeUserFromProject(
    @Arg("userId") userId: number,
    @Arg("projectId", { nullable: true }) projectId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    const project = await Project.getByIdOrShortName(projectId, shortName, true);

    if (!project) {
      return false;
    }

    const userIndex = project.users.findIndex((us) => us.id === userId);
    if (userIndex === -1) {
      return false;
    }

    project.users.splice(userIndex, 1);
    project.save();

    return true;
  }

  @Query(() => [User])
  @UseMiddleware(isAuth, isExec)
  async projectUsers(
    @Arg("projectId", { nullable: true }) projectId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ) {
    const project = await Project.getByIdOrShortName(projectId, shortName, true);

    if (!project) {
      return [];
    }
    return project.users;
  }
}