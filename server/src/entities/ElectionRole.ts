import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoleManifesto } from "./RoleManifesto";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class ElectionRole extends BaseEntity {
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
    manifestoTemplate: string;
    
    @Field({ defaultValue: "" })
    @Column({ default: "" })
    previewImg: string;

    @Field({ defaultValue: false })
    @Column({ default: false })
    canSubmitManifesto: boolean;

    @Field({ defaultValue: "" })
    @Column({ default: "" })
    submitManifestoUrl: string;

    @Field(() => [RoleManifesto])
    @OneToMany(() => RoleManifesto, manifesto => manifesto.role)
    manifestos: RoleManifesto[];

    static async getByIdOrShortName(roleId?: number,
        shortName?: string,
        relations: boolean = false) {
        if (roleId) {
            return await this.findOne(roleId, relations ? { relations: ["manifestos"] } : {});
        } else if (shortName) {
            return await this.findOne(
                { shortName },
                relations ? { relations: ["manifestos"] } : {}
            );
        } else {
            return undefined;
        }
    }
}