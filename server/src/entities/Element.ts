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

  static async getElementByIdWithChildren(id: number): Promise<Element> {
    const element = await Element.findOneOrFail(id, {
      relations: [
        "createdBy",
        "parent",
        "children",
        "canModifyPermsGroups",
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
            "canModifyPermsGroups",
            "canEditGroups",
            "canViewGroups",
            "canInteractGroups",
          ],
        })
      )
    );
    return element;
  }

  static async getElementsWithChildren(
    findOptions: FindManyOptions<Element>
  ): Promise<Element[]> {
    const elements = await Element.find({
      ...findOptions,
      relations: [
        "createdBy",
        "parent",
        "children",
        "canModifyPermsGroups",
        "canEditGroups",
        "canViewGroups",
        "canInteractGroups",
      ],
    });

    const elementsWithChildren = await Promise.all(
      elements.map(async (element) => {
        element.children = await Promise.all(
          element.children.map((child) =>
            Element.findOneOrFail(child.id, {
              relations: [
                "createdBy",
                "parent",
                "canModifyPermsGroups",
                "canEditGroups",
                "canViewGroups",
                "canInteractGroups",
              ],
            })
          )
        );
        return element;
      })
    );

    return elementsWithChildren;
  }
}
