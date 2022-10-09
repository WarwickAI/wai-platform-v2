import { User } from "../entities/User";
import {
  Arg,
  Mutation,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { isAuth, isExec } from "../isAuth";
import { MemberInfoInput } from "../utils/MemberInfoInput";
import axios from "axios";
import convert from "xml-js";

@Resolver()
export class AdminResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isExec)
  async addMemberInfo(
    @Arg("memberInfo", () => [MemberInfoInput]) memberInfo: MemberInfoInput[]
  ) {
    const dateAddedMemberInfo = memberInfo.map((userInfo) => {
      const dateStringSplit = userInfo.dataJoined.split(" ");
      const dateSplit = dateStringSplit[0].split("/");
      const timeSplit = dateStringSplit[1].split(":");
      const userJoinedDate = new Date(
        parseInt(dateSplit[2], 10),
        parseInt(dateSplit[1], 10) - 1,
        parseInt(dateSplit[0], 10),
        parseInt(timeSplit[0], 10),
        parseInt(timeSplit[1], 10)
      );
      return { ...userInfo, dataJoined: userJoinedDate };
    });
    dateAddedMemberInfo.forEach(async (info) => {
      const user = await User.findOne({ where: { uniId: info.uniId } });
      if (user !== undefined) {
        user.isMember = true;
        user.memberFromDate = info.dataJoined;
        user.save();
      }
    });
    return true;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth, isExec)
  async updateMembership() {
    const response = await axios.get(
      `https://www.warwicksu.com/membershipapi/listmembers/${process.env.WARWICK_SU_API_KEY}/`
    );

    try {
      const data = JSON.parse(
        convert.xml2json(response.data, { compact: true, spaces: 2 })
      );
      var users = data["MembershipAPI"]["Member"] as {
        FirstName: { _text: string };
        LastName: { _text: string };
        UniqueID: { _text: string };
        EmailAddress: { _text: string };
      }[];
      // users = users.slice(0, 10);
      users.forEach(async (user) => {

        const dbUser = await User.createQueryBuilder("user")
          .where("LOWER(user.email) = LOWER(:email)", {
            email: user.EmailAddress._text,
          })
          .getOne();

        if (dbUser !== undefined) {
          dbUser.uniId = parseInt(user.UniqueID._text);
          dbUser.isMember = true;
          dbUser.save();
        }
      });
    } catch (e) {
      console.log(e);
      return false;
    }
    return true;
  }
}
