import { fetchData } from "../utilities";
import { serverUrl } from "../constants";

export const getUserInfo = async (token: string) => {
  const response = await fetchData("GET", serverUrl + "/user", token);
  return response;
};
