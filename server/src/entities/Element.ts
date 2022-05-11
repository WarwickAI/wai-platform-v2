import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { GraphQLJSONObject } from "graphql-type-json";
import { User } from "./User";

export enum ElementType {
  Text,
  Page,
  Database,
  DatabaseView,
}

registerEnumType(ElementType, {
  name: "ElementType",
  description: "Different options for elements",
});

@ObjectType()
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
  @ManyToOne(() => Element, (element) => element.content, { nullable: true })
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
  @OneToMany(() => Element, (element) => element.parent, { cascade: true })
  content: Element[];
}
