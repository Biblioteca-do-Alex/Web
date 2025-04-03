import api from "./api";

const userService = {
  postLogin: async ({ email, senha }) => {
    const response = await api.post(
      `/usuarios/login?email=${encodeURIComponent(
        email
      )}&senha=${encodeURIComponent(senha)}`
    );
    return response.data;
  },
  postSalvar: async (data) => {
    const response = await api.post("/usuarios/salvar", data);
    return response.data;
  },
};

export default userService;
