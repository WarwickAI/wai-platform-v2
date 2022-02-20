import { ObjectType, Field } from "type-graphql";
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { User } from "./User";

@ObjectType()
@Entity()
export class Badge extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({ unique: true })
  shortName: string;

  @Field()
  @Column()
  description: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  assignableFrom?: Date;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  assignableTo?: Date;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.projects, { cascade: true })
  @JoinTable()
  users: User[];

  @Field()
  @Column()
  color: string;

  static async getByIdOrShortName(
    badgeId?: number,
    shortName?: string,
    relations: boolean = false
  ) {
    if (badgeId) {
      return await this.findOne(
        badgeId,
        relations ? { relations: ["users"] } : {}
      );
    } else if (shortName) {
      return await this.findOne(
        { shortName },
        relations ? { relations: ["users"] } : {}
      );
    } else {
      return undefined;
    }
  }
}
