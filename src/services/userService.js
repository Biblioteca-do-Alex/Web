import api from "./api";

const userService = {
  postLogin: async (data) => {
    const response = await api.post("/login", data);
    return response.data;
  }
};

export default userService;
