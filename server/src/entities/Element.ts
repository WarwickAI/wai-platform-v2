import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from "typeorm";
import { GraphQLJSONObject } from "graphql-type-json";
import { User } from "./User";
import { Group } from "./Group";

// Types of elements
export enum ElementType {
  Text = "Text",
  Page = "Page",
  Database = "Database",
  DatabaseView = "DatabaseView",
  PropertyLink = "PropertyLink",
  Button = "Button",
  User = "User",
  Data = "Data",
}
// So that we can use it typegraphql
registerEnumType(ElementType, {
  name: "ElementType",
  description: "Different options for elements",
});

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
  @TreeParent()
  parent?: Element;

  @Field()
  @Column()
  index: number;

  @Field(() => ElementType)
  @Column()
  type: ElementType;

  @Field(() => GraphQLJSONObject)
  @Column("simple-json")
  props: object;

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
}
