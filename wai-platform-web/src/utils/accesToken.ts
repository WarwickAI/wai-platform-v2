import { decode } from "jsonwebtoken";
import { UserInfo } from "./userContext";

let accessToken = "";

export const setAccessToken = (newToken: string) => {
  accessToken = newToken;
  const decodedInfo = decode(newToken) as any;
  try {
    const userInfo: UserInfo = {
      firstName: decodedInfo.firstName,
      lastName: decodedInfo.lastName,
      email: decodedInfo.email,
      isLoggedIn: true,
    }
    return userInfo;
  } catch {
    const userInfo: UserInfo = {
      firstName: "",
      lastName: "",
      email: "",
      isLoggedIn: false,
    }
    return userInfo;
  }
};

export const getAccessToken = () => {
  return accessToken;
};
