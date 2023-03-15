import fetch from "./axios";

export const getUserById = async (id: string) => {
  try {
    const data = await fetch.get(`/api/v1/user`);
    return data;
  } catch (err) {
    return err;
  }
};
