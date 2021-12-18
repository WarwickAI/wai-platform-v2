import { MyContext } from "../types";
import { Arg, Ctx, Query, Resolver } from "type-graphql";
import { Project } from "../entities/Project";

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
}