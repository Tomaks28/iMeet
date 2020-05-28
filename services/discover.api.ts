import { fetchData } from "../utilities";
import { serverUrl } from "../constants";

export const getDiscoverProfiles = async (token: string) => {
  const response = await fetchData("GET", serverUrl + "/discover", token);
  return response;
};
