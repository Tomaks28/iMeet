export const getAxiosError = (error: any) => {
  if (error.response !== undefined) {
    return error.response.data.message;
  } else {
    return error.message;
  }
};
