import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  FindManyOptions,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from "typeorm";
import { GraphQLJSONObject } from "graphql-type-json";
import { User } from "./User";
import { Group } from "./Group";

@ObjectType()
@Tree("materialized-path")
@Entity()
export class Element extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.elements)
  createdBy: User;

  @Field(() => Element, { nullable: true })
  @TreeParent({ onDelete: "CASCADE" })
  parent?: Element;

  @Field()
  @Column()
  index: number;

  @Field()
  @Column()
  type: string;

  @Field({ nullable: true, defaultValue: null })
  @Column({ nullable: true, default: null, unique: true })
  route?: string;

  @Field(() => GraphQLJSONObject)
  @Column("simple-json")
  data: object;

  @Field(() => [Element])
  @TreeChildren()
  children: Element[];

  @Field(() => [Group])
  @ManyToMany(() => Group, (group) => group.canViewElements)
  canViewGroups: Group[];

  @Field(() => [Group])
  @ManyToMany(() => Group, (group) => group.canInteractElements)
  canInteractGroups: Group[];

  @Field(() => [Group])
  @ManyToMany(() => Group, (group) => group.canEditElements)
  canEditGroups: Group[];

  @Field(() => [Group], { defaultValue: [] })
  @ManyToMany(() => Group, (group) => group.canModifyPermsElements)
  canModifyPermsGroups: Group[];

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.page, { nullable: true })
  user: User;
}
