import axios from "axios";

export const deleteImage = async (
  url: string,
  public_id: string,
  bearer: string
) => {
  try {
    const { data } = await axios.post(
      url,
      { public_id },
      {
        headers: {
          Authorization: "Bearer " + bearer,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("delete image failed", error);
    return null;
  }
};
