import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver, UseMiddleware } from "type-graphql";
import { Project } from "../entities/Project";
import { ProjectInput } from "../utils/ProjectInput";
import { validateProject } from "../utils/validateProject";
import { isAuth, isExec } from "../isAuth";

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}
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
        return Project.find({ display: true });
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
        return Project.findOne({ shortName })
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
        @Arg("shortName") shortName: string,
        @Arg("projectInfo") projectInfo: ProjectInput
    ): Promise<ProjectResponse> {
        const errors = validateProject(projectInfo);
        if (errors) {
            return { errors };
        }
        var project = await Project.findOne({ shortName });
        if (!project) {
            return {
                errors: [
                    {
                        field: "shortName",
                        message: "no project found with that short name",
                    },
                ],
            };
        }

        project.title = projectInfo.title;
        project.shortName = projectInfo.shortName;
        project.description = projectInfo.description || "";
        project.cover = projectInfo.cover || "";
        project.difficulty = projectInfo.difficulty || "";
        project.display = projectInfo.display || false;

        await project.save();

        return { project };
    }
}