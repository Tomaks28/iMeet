import axios from "axios";

export const fetchData = async (
  type: "GET" | "POST",
  endpoint: string,
  bearer?: string,
  params?: any
) => {
  try {
    let fetchData = null;
    if (type === "GET") {
      const { data } = await axios.get(endpoint, {
        headers: { Authorization: bearer && `Bearer ${bearer}` },
        params: { ...params },
      });
      fetchData = data;
    } else {
      const { data } = await axios.post(
        endpoint,
        { ...params },
        {
          headers: { Authorization: bearer && `Bearer ${bearer}` },
        }
      );
      fetchData = data;
    }
    return { success: true, data: fetchData };
  } catch (error) {
    return { success: false, data: error };
  }
};
