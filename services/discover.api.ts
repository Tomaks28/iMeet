import { fetchData } from "../utilities";
import { serverUrl } from "../constants";

interface Reaction {
  id: string;
  reaction: boolean;
}

export const getDiscoverProfiles = async (token: string) => {
  const response = await fetchData("GET", serverUrl + "/discover", token);
  return response;
};

export const sendReactionToProfil = async (token: string, params: Reaction) => {
  const response = await fetchData("POST", serverUrl + "/match", token, {
    id: params.id,
    reaction: params.reaction,
  });
  return response;
};
