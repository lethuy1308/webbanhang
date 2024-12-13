import axiosClient from "../axiosClient";

export const dangKiRequest = async (values) => {
  try {
    const res = await axiosClient.get("/users", values);
    const kiemTraUser = res.find(
      (user) => user.username === values.username || user.email === values.email
    );

    return !kiemTraUser;
  } catch (error) {
    return false;
  }
};
