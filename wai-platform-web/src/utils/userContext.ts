import React from "react";

export type UserInfo = {
    firstName: string;
    lastName: string;
    isLoggedIn: boolean;
    email: string;
}

const UserInfoContext = React.createContext<{ userInfo: UserInfo, setUserInfo: (userInfo: UserInfo) => void }>({ userInfo: { firstName: "", lastName: "", isLoggedIn: false, email: "" }, setUserInfo: (userInfo: UserInfo) => { } });

export {
    UserInfoContext
}