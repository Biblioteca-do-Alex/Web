import api from "./api";

const authService = {
  postLogin: async (data) => {
    const response = await api.post("/login", data);
    return response.data;
  },
  getLogin: async () => {
    const response = await api.get("/images/search?limit=1");
    return response.data;
  },
};

export default authService;
