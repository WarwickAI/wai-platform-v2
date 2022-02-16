import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ElectionRole } from "./ElectionRole";
import { User } from "./User";

@ObjectType() // Is now an Object Type also for GraphQL
@Entity() // Is a DB table
export class RoleApplication extends BaseEntity {
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
    @ManyToOne(() => ElectionRole, role => role.applications)
    role: ElectionRole;

    @Field(() => User)
    @ManyToOne(() => User, user => user.applications)
    user: User;

    static async getByIdOrShortName(
        applicationId?: number,
        applicationShortName?: string,
        relations: boolean = false) {

        if (applicationId) {
            return await this.findOne(applicationId, relations ? { relations: ["role"] } : {});
        } else if (applicationShortName) {
            return await this.findOne(
                { shortName: applicationShortName },
                relations ? { relations: ["role"] } : {}
            );
        } else {
            return undefined;
        }
    }
}