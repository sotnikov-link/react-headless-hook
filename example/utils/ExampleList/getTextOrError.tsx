export const getTextOrError = (response: Response) => {
  if (response.status < 400) {
    return response.text();
  } else {
    throw new Error(response.statusText);
  }
};
