import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth, isExec } from "../isAuth";
import FieldError from "../utils/FieldError";
import { Merch } from "../entities/Merch";
import { MerchInput } from "../utils/MerchInput";
import { validateMerch } from "../utils/validateMerch";

@ObjectType()
class MerchResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Merch, { nullable: true })
  item?: Merch;
}

@Resolver()
export class MerchResolver {
  @Query(() => [Merch])
  async merch(): Promise<Merch[]> {
    var merch = await Merch.find({ display: true });
    return merch;
  }

  @Query(() => [Merch])
  @UseMiddleware(isAuth, isExec)
  async allMerch(): Promise<Merch[]> {
    var merch = await Merch.find({});
    return merch;
  }

  @Query(() => Merch, { nullable: true })
  async merchByShortName(
    @Arg("shortName") shortName: string
  ): Promise<Merch | undefined> {
    const item = await Merch.findOne({ shortName });
    if (!item) {
      return undefined;
    }
    return item;
  }

  @Mutation(() => MerchResponse)
  @UseMiddleware(isAuth, isExec)
  async createMerch(
    @Arg("itemInfo") itemInfo: MerchInput
  ): Promise<MerchResponse> {
    const errors = validateMerch(itemInfo);
    if (errors) {
      return { errors };
    }
    const item = await Merch.create(itemInfo).save();
    return { item };
  }

  @Mutation(() => MerchResponse)
  @UseMiddleware(isAuth, isExec)
  async editMerch(
    @Arg("id") id: number,
    @Arg("itemInfo") itemInfo: MerchInput
  ): Promise<MerchResponse> {
    const errors = validateMerch(itemInfo);
    if (errors) {
      return { errors };
    }
    await Merch.update(id, itemInfo);
    const item = await Merch.findOne(id);
    return { item };
  }
}

// const getCourseByIdOrName = async (
//   courseId?: number,
//   shortName?: string,
//   relations?: boolean
// ) => {
//   if (courseId) {
//     return await Course.findOne(
//       courseId,
//       relations ? { relations: ["users"] } : {}
//     );
//   } else if (shortName) {
//     return await Course.findOne(
//       { shortName },
//       relations ? { relations: ["users"] } : {}
//     );
//   } else {
//     return undefined;
//   }
// };
