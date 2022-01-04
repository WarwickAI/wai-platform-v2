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
import { Project } from "../entities/Project";
import { ProjectInput } from "../utils/ProjectInput";
import { validateProject } from "../utils/validateProject";
import { isAuth, isExec } from "../isAuth";
import FieldError from "../utils/FieldError";
import { User } from "../entities/User";

@ObjectType()
class ProjectResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Project, { nullable: true })
  project?: Project;
}

@Resolver()
export class ProjectResolver {
  @Query(() => [Project])
  async projects(): Promise<Project[]> {
    var projects = await Project.find({ display: true });
    projects.forEach((project) => (project.users = []));
    return projects;
  }

  @Query(() => [Project])
  @UseMiddleware(isAuth, isExec)
  async allProjects(): Promise<Project[]> {
    return Project.find();
  }

  @Query(() => Project, { nullable: true })
  async projectByShortName(
    @Arg("shortName") shortName: string
  ): Promise<Project | undefined> {
    const project = await Project.findOne({ shortName });
    if (!project) {
      return undefined;
    }
    project.users = [];
    return project;
  }

  @Mutation(() => ProjectResponse)
  @UseMiddleware(isAuth, isExec)
  async createProject(
    @Arg("projectInfo") projectInfo: ProjectInput
  ): Promise<ProjectResponse> {
    const errors = validateProject(projectInfo);
    if (errors) {
      return { errors };
    }
    const project = await Project.create(projectInfo).save();
    return { project };
  }

  @Mutation(() => ProjectResponse)
  @UseMiddleware(isAuth, isExec)
  async editProject(
    @Arg("id") id: number,
    @Arg("projectInfo") projectInfo: ProjectInput
  ): Promise<ProjectResponse> {
    const errors = validateProject(projectInfo);
    if (errors) {
      return { errors };
    }
    await Project.update(id, projectInfo);
    const project = await Project.findOne(id);
    return { project };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async joinProject(
    @Ctx() { payload }: MyContext,
    @Arg("projectId", { nullable: true }) projectId?: number,
    @Arg("shortName", { nullable: true }) shortName?: string
  ): Promise<Boolean> {
    const user = await User.findOne(payload?.userId, {
      relations: ["projects"],
    });
    if (!user) {
      return false;
    }

    const project = await getProjectByIdOrName(projectId, shortName, true);

    if (!project || !project.joinButton) {
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

    const project = await getProjectByIdOrName(projectId, shortName, true);

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
    const project = await getProjectByIdOrName(projectId, shortName, true);

    if (!project) {
      return [];
    }
    return project.users;
  }
}

const getProjectByIdOrName = async (projectId?: number, shortName?: string, relations?: boolean) => {
  if (projectId) {
    return await Project.findOne(projectId, relations ? { relations: ["users"] } : {});
  } else if (shortName) {
    return await Project.findOne({ shortName }, relations ? { relations: ["users"] } : {});
  } else {
    return undefined;
  }
}