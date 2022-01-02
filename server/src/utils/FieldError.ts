import { Field, ObjectType } from "type-graphql";

@ObjectType()
export default class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}