import api from "./api";

const authService = {
  postLogin: async (data) => {
    const response = await api.post("/login", data);
    return response.data;
  }
};

export default authService;
