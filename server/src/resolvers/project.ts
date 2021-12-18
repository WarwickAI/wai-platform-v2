import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { Project } from "../entities/Project";
import { ProjectInput } from "../utils/ProjectInput";
import { validateProject } from "../utils/validateProject";

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
    async projects(@Ctx() { em }: MyContext): Promise<Project[]> {
        return em.find(Project, {});
    }

    @Query(() => Project, { nullable: true })
    async projectByShortName(
        @Arg("shortName") shortName: string,
        @Ctx() { em }: MyContext
    ): Promise<Project | null> {
        return em.findOne(Project, { shortName: shortName });
    }

    @Mutation(() => ProjectResponse)
    async createProject(
        @Arg("projectInfo") projectInfo: ProjectInput,
        @Ctx() { em }: MyContext
    ): Promise<ProjectResponse> {
        const errors = validateProject(projectInfo);
        if (errors) {
            return { errors };
        }
        const project = em.create(Project, projectInfo);
        try {
            await em.persistAndFlush(project);
        } catch (err) {
            if (err.code === "23505") {
                // || err.detail.includes("already exists")) {
                // Duplicate username error
                return {
                    errors: [
                        {
                            field: "username",
                            message: "username already taken",
                        },
                    ],
                };
                // }
            } else {
                console.log(err);
                return {
                    errors: []
                }
            }
        }

        return { project };
    }
}