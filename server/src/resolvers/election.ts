import {
    Arg,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
    UseMiddleware,
} from "type-graphql";
import { isAuth, isExec } from "../isAuth";
import FieldError from "../utils/FieldError";
import { ElectionRole } from "../entities/ElectionRole";
import { validateElectionRole } from "../utils/validateElectionRole";
import { ElectionRoleInput } from "../utils/ElectionRoleInput";
import { RoleManifesto } from "../entities/RoleManifesto";

@ObjectType()
export class ElectionRoleResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field()
    role?: ElectionRole;
}

@Resolver()
export class ElectionResolver {
    @Query(() => [ElectionRole])
    async electionRoles(): Promise<ElectionRole[]> {
        return await ElectionRole.find({ where: { display: true }, relations: ["manifestos"] });
    }

    @Query(() => [ElectionRole])
    @UseMiddleware(isAuth, isExec)
    async allElectionRoles(): Promise<ElectionRole[]> {
        return await ElectionRole.find({ relations: ["manifestos"] });
    }

    @Query(() => ElectionRole, { nullable: true })
    async getElectionRole(
        @Arg("roleId", { nullable: true }) roleId?: number,
        @Arg("shortName", { nullable: true }) shortName?: string
    ): Promise<ElectionRole | undefined> {
        const role = await ElectionRole.getByIdOrShortName(roleId, shortName, true);
        if (!role) return;
        return role;
    }

    @Mutation(() => ElectionRoleResponse)
    @UseMiddleware(isAuth, isExec)
    async createElectionRole(
        @Arg("roleInfo") roleInfo: ElectionRoleInput
    ): Promise<ElectionRoleResponse> {
        const errors = validateElectionRole(roleInfo);
        if (errors) {
            return { errors };
        }

        const role = await ElectionRole.create(roleInfo).save();
        return { role };
    }

    @Mutation(() => ElectionRoleResponse)
    @UseMiddleware(isAuth, isExec)
    async editElectionRole(
        @Arg("id") id: number,
        @Arg("roleInfo") roleInfo: ElectionRoleInput
    ): Promise<ElectionRoleResponse> {
        const errors = validateElectionRole(roleInfo);
        if (errors) {
            return { errors };
        }

        await ElectionRole.update(id, roleInfo);
        var role = await ElectionRole.findOne(id, { relations: ["manifestos"] });

        if (!role) {
            return { errors: [{ field: "Election Role ID", message: "No role found" }] };
        } else {
            return { role }
        }
    }

    @Query(() => [RoleManifesto])
    async electionRoleManifestos(
        @Arg("roleId", { nullable: true }) roleId?: number,
        @Arg("shortName", { nullable: true }) shortName?: string
    ): Promise<RoleManifesto[]> {
        const role = await ElectionRole.getByIdOrShortName(roleId, shortName, true);

        if (!role) {
            return [];
        }
        const publicManifestos = role.manifestos.filter((manifesto) => manifesto.display);
        return publicManifestos;
    }

    @Query(() => [RoleManifesto])
    @UseMiddleware(isAuth, isExec)
    async electionRoleAllManifestos(
        @Arg("roleId", { nullable: true }) roleId?: number,
        @Arg("shortName", { nullable: true }) shortName?: string
    ): Promise<RoleManifesto[]> {
        const role = await ElectionRole.getByIdOrShortName(roleId, shortName, true);

        if (!role) {
            return [];
        }
        return role.manifestos;
    }
}