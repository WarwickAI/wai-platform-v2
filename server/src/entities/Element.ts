import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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

  @Field(() => User, { nullable: true })
  @OneToOne(() => User, (user) => user.page, { nullable: true })
  user: User;

  static async getElementByIdWithChildren(id: number): Promise<Element> {
    const element = await Element.findOneOrFail(id, {
      relations: [
        "createdBy",
        "parent",
        "children",
        "canEditGroups",
        "canViewGroups",
        "canInteractGroups",
      ],
    });

    element.children = await Promise.all(
      element.children.map((child) =>
        Element.findOneOrFail(child.id, {
          relations: [
            "createdBy",
            "parent",
            "canEditGroups",
            "canViewGroups",
            "canInteractGroups",
          ],
        })
      )
    );
    return element;
  }
}
