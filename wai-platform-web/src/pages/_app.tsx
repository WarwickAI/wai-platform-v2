import { useState } from "react";
import ThemeConfig from "../theme";
import { UserInfoContext } from "../utils/userContext";

function MyApp({ Component, pageProps }) {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    isLoggedIn: false,
    email: "",
  });

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      <ThemeConfig>
        <Component {...pageProps} />
      </ThemeConfig>
    </UserInfoContext.Provider>
  );
}

export default MyApp;
