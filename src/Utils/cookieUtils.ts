// import Cookies from "js-cookie";

// export function setCookie(
//   cname: string,
//   cvalue: string,
//   exdays: number,
//   customName: string
// ): void {
//   const d = new Date();
//   d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
//   const expires = "expires=" + d.toUTCString();
//   document.cookie = customName + "=" + cvalue + ";" + expires + ";path=/";
// }

// export function getCookie(cname: string): string {
//   const name = cname + "=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === "") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }

import Cookies from "js-cookie";

export const getCookie = (name: string): string | undefined => {
  return Cookies.get(name);
};

export const setCookie = (
  name: string,
  value: string,
  options: Cookies.CookieAttributes = {}
): void => {
  Cookies.set(name, value, options);
};

export const removeCookie = (name: string): void => {
  Cookies.remove(name);
};

export const setRememberMeCookies = (
  email: string,
  password: string,
  rememberMe: boolean
): void => {
  console.log("cookie should add");

  if (rememberMe) {
    const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); //30days

    setCookie("rememberEmail", email, {
      expires: expirationDate,
    });
    setCookie("rememberPassword", password, {
      expires: expirationDate,
    });
    setCookie("rememberMe", "true", {
      expires: expirationDate,
      sameSite: "strict",
    });
  } else {
    removeCookie("rememberEmail");
    removeCookie("rememberPassword");
    removeCookie("rememberMe");
  }
};
