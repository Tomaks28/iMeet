import axios from "axios";

// Connexion de l'utilisateur afin de récupérer le token
export const Api_signIn = async (
  serverUrl: string,
  email: string,
  password: string
) => {
  try {
    const { data } = await axios.post(serverUrl + `/user/signin`);
    return data;
  } catch (err) {
    return err;
  }
};

//Création d'un nouvel utilisateur et récupération du token
export const Api_signUp = async (
  serverUrl: string,
  email: string,
  password: string
) => {
  try {
    const { data } = await axios.post(serverUrl + `/user/signup`);
    return data;
  } catch (err) {
    return err;
  }
};

// Récupération des données de login facebook
export const Api_facebookLogin = async (token: string) => {
  try {
    const { data } = await axios.post(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,last_name,short_name,picture.type(large)`
    );
    return data;
  } catch (err) {
    return err;
  }
};
