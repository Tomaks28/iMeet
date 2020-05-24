import axios from "axios";

export const uploadImage = async (url: string, uri: string, bearer: string) => {
  try {
    const uriParts = uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append("image", {
      //@ts-ignore
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append("token", bearer);

    const { data } = await axios.post(url, formData, {
      headers: {
        Authorization: "Bearer " + bearer,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    console.log("upload image failed", error);
    return null;
  }
};
