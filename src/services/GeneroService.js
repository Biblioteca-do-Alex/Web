import api from "./api";

const generoService = {
  getGeneros: async () => {
    const response = await api.get("/generos");
    return response.data;
  },
};

export default generoService;
