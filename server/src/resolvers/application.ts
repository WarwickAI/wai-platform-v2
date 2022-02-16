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
import { isAuth, isExec } from "../isAuth";
import FieldError from "../utils/FieldError";
import { RoleApplication } from "../entities/RoleApplication";
import { validateRoleApplication } from "../utils/validateRoleApplication";
import { ApplyRoleInput, RoleApplicationInput } from "../utils/RoleApplicationInput";
import { ElectionRole } from "../entities/ElectionRole";
import { MyContext } from "../types";
import { User } from "../entities/User";

@ObjectType()
export class RoleApplicationResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => RoleApplication, { nullable: true })
    application?: RoleApplication;
}

@Resolver()
export class ApplicationResolver {
    @Query(() => [RoleApplication])
    async roleApplications(): Promise<RoleApplication[]> {
        return await RoleApplication.find({ where: { display: true }, relations: ["role"] });
    }

    @Query(() => [RoleApplication])
    @UseMiddleware(isAuth, isExec)
    async allRoleApplications(): Promise<RoleApplication[]> {
        return await RoleApplication.find({ relations: ["role"] });
    }

    @Query(() => RoleApplication, { nullable: true })
    async getRoleApplication(
        @Arg("applicationId", { nullable: true }) applicationId?: number,
        @Arg("shortName", { nullable: true }) shortName?: string
    ): Promise<RoleApplication | undefined> {
        const application = await RoleApplication.getByIdOrShortName(applicationId, shortName, true);
        if (!application) return;
        return application;
    }

    @Mutation(() => RoleApplicationResponse)
    @UseMiddleware(isAuth)
    async roleApply(
        @Ctx() { payload }: MyContext,
        @Arg("applicationInfo") applicationInfo: ApplyRoleInput,
        @Arg("roleId", { nullable: true }) roleId: number,
        @Arg("roleShortName", { nullable: true }) roleShortName: string,
    ): Promise<RoleApplicationResponse> {
        const errors = validateRoleApplication(applicationInfo);
        if (errors) {
            return { errors };
        }

        const user = await User.findOne(payload!.userId, { relations: ["applications"] });
        if (!user) {
            return {
                errors: [
                    { field: "User ID", message: "No user found with ID" }
                ]
            }
        }

        const roles: ElectionRole[] = [];
        for (let i = 0; i < user.applications.length; i++) {
            const application = await RoleApplication.findOne(user.applications[i].id, { relations: ["role"] })
            if (application?.role) {
                roles.push(application.role)
            }
        }

        if (roles.findIndex((role) => roleId ? role.id === roleId : role.shortName === roleShortName) !== -1) {
            return {
                errors: [
                    { field: "User ID", message: "User already applied for role" }
                ]
            }
        }

        const role = await ElectionRole.getByIdOrShortName(roleId, roleShortName, true);
        if (!role) {
            return {
                errors: [
                    { field: "Role ID/Short Name", message: "No election role found" }
                ]
            }
        }

        if (!role.canApply) {
            return {
                errors: [
                    { field: "Role ID/Short Name", message: "Role not accepting applications" }
                ]
            }
        }

        const application = await RoleApplication.create({ ...applicationInfo, display: false }).save();
        application.role = role;
        application.user = user;
        application.save();

        return { application };
    }

    @Mutation(() => RoleApplicationResponse)
    @UseMiddleware(isAuth, isExec)
    async createRoleApplication(
        @Arg("applicationInfo") applicationInfo: RoleApplicationInput,
        @Arg("roleId", { nullable: true }) roleId: number,
        @Arg("roleShortName", { nullable: true }) roleShortName: string,
    ): Promise<RoleApplicationResponse> {
        const errors = validateRoleApplication(applicationInfo);
        if (errors) {
            return { errors };
        }

        const role = await ElectionRole.getByIdOrShortName(roleId, roleShortName, true);
        if (!role) {
            return {
                errors: [
                    { field: "Role ID/Short Name", message: "No election role found" }
                ]
            }
        }

        const application = await RoleApplication.create(applicationInfo).save();
        application.role = role;
        application.save();

        return { application };
    }

    @Mutation(() => RoleApplicationResponse)
    @UseMiddleware(isAuth, isExec)
    async editRoleApplication(
        @Arg("id") id: number,
        @Arg("applicationInfo") applicationInfo: RoleApplicationInput
    ): Promise<RoleApplicationResponse> {
        const errors = validateRoleApplication(applicationInfo);
        if (errors) {
            return { errors };
        }

        await RoleApplication.update(id, applicationInfo);
        var application = await RoleApplication.findOne(id, { relations: ["role"] });

        if (!application) {
            return { errors: [{ field: "Role Application ID", message: "No application found" }] };
        } else {
            return { application }
        }
    }

    @Query(() => ElectionRole, { nullable: true })
    async roleApplicationElectionRole(
        @Arg("applicationId", { nullable: true }) applicationId?: number,
        @Arg("shortName", { nullable: true }) shortName?: string
    ): Promise<ElectionRole | undefined> {
        const application = await RoleApplication.getByIdOrShortName(applicationId, shortName, true);

        if (!application) {
            return undefined;
        }
        return application.role;
    }
}