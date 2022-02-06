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
import { RoleManifesto } from "../entities/RoleManifesto";
import { validateRoleManifesto } from "../utils/validateRoleManifesto";
import { RoleManifestoInput } from "../utils/RoleManifestoInput";
import { ElectionRole } from "../entities/ElectionRole";

@ObjectType()
export class RoleManifestoResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field()
    manifesto?: RoleManifesto;
}

@Resolver()
export class ManifestoResolver {
    @Query(() => [RoleManifesto])
    async roleManifestos(): Promise<RoleManifesto[]> {
        return await RoleManifesto.find({ where: { display: true }, relations: ["role"] });
    }

    @Query(() => [RoleManifesto])
    @UseMiddleware(isAuth, isExec)
    async allRoleManifestos(): Promise<RoleManifesto[]> {
        return await RoleManifesto.find({ relations: ["role"] });
    }

    @Query(() => RoleManifesto, { nullable: true })
    async getRoleManifesto(
        @Arg("manifestoId", { nullable: true }) manifestoId?: number,
        @Arg("shortName", { nullable: true }) shortName?: string
    ): Promise<RoleManifesto | undefined> {
        const manifesto = await RoleManifesto.getByIdOrShortName(manifestoId, shortName, true);
        if (!manifesto) return;
        return manifesto;
    }

    @Mutation(() => RoleManifestoResponse)
    @UseMiddleware(isAuth, isExec)
    async createRoleManifesto(
        @Arg("manifestoInfo") manifestoInfo: RoleManifestoInput,
        @Arg("roleId", { nullable: true }) roleId: number,
        @Arg("roleShortName", { nullable: true }) roleShortName: string,
    ): Promise<RoleManifestoResponse> {
        const errors = validateRoleManifesto(manifestoInfo);
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

        const manifesto = await RoleManifesto.create(manifestoInfo).save();
        manifesto.role = role;
        manifesto.save();
        
        return { manifesto };
    }

    @Mutation(() => RoleManifestoResponse)
    @UseMiddleware(isAuth, isExec)
    async editRoleManifesto(
        @Arg("id") id: number,
        @Arg("manifestoInfo") manifestoInfo: RoleManifestoInput
    ): Promise<RoleManifestoResponse> {
        const errors = validateRoleManifesto(manifestoInfo);
        if (errors) {
            return { errors };
        }

        await RoleManifesto.update(id, manifestoInfo);
        var manifesto = await RoleManifesto.findOne(id, { relations: ["role"] });

        if (!manifesto) {
            return { errors: [{ field: "Role Manifesto ID", message: "No manifesto found" }] };
        } else {
            return { manifesto }
        }
    }

    @Query(() => ElectionRole, { nullable: true })
    async roleManifestoElectionRole(
        @Arg("manifestoId", { nullable: true }) manifestoId?: number,
        @Arg("shortName", { nullable: true }) shortName?: string
    ): Promise<ElectionRole | undefined> {
        const manifesto = await RoleManifesto.getByIdOrShortName(manifestoId, shortName, true);

        if (!manifesto) {
            return undefined;
        }
        return manifesto.role;
    }
}