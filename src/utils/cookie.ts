import Cookies from "js-cookie";

export function setAuthToken(token: string) {
  Cookies.set("admin_token", token, { expires: 1 / 24 });
}

export function clearAuthToken() {
  Cookies.remove("admin_token");
}
