import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn,
} from "typeorm";
import { GraphQLJSONObject } from "graphql-type-json";
import { User } from "./User";
import { Group } from "./Group";

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

  // @Field(() => Element, { nullable: true })
  // @ManyToOne(() => Element, (element) => element.content, { nullable: true })
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

  // @Field(() => [Element])
  // @OneToMany(() => Element, (element) => element.parent, { cascade: true })
  @Field(() => [Element])
  @TreeChildren()
  content: Element[];

  @Field(() => [Group])
  @ManyToMany(() => Group, (group) => group.canEditElements, { cascade: true })
  canEditGroups: Group[];

  @Field(() => [Group])
  @ManyToMany(() => Group, (group) => group.canViewElements, { cascade: true })
  canViewGroups: Group[];

  @Field(() => [Group])
  @ManyToMany(() => Group, (group) => group.canInteractElements, {
    cascade: true,
  })
  canInteractGroups: Group[];
}
