import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ElectionRole } from "./ElectionRole";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class RoleManifesto extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @CreateDateColumn()
    updatedAt: Date;

    @Field({ defaultValue: false })
    @Column()
    display: boolean;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column({ unique: true })
    shortName: string;

    @Field()
    @Column()
    description: string;

    @Field({ defaultValue: "" })
    @Column({ default: "" })
    img: string;

    @Field(() => ElectionRole)
    @ManyToOne(() => ElectionRole, role => role.manifestos)
    role: ElectionRole;

    static async getByIdOrShortName(
        manifestoId?: number,
        manifestoShortName?: string,
        relations: boolean = false) {

        if (manifestoId) {
            return await this.findOne(manifestoId, relations ? { relations: ["role"] } : {});
        } else if (manifestoShortName) {
            return await this.findOne(
                { shortName: manifestoShortName },
                relations ? { relations: ["role"] } : {}
            );
        } else {
            return undefined;
        }
    }
}