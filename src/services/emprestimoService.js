import api from "./api";

const emprestimoService = {
  getEmprestimos: async (userId) => {
    const response = await api.get(
      `/emprestimos/buscarPorUsuario/${encodeURIComponent(userId)}`
    );
    return response.data;
  },
  getEmprestimoPorUserEExemplar: async (userId, exemplarId) => {
    const response = await api.get(
      `/emprestimos/buscar/${encodeURIComponent(userId)}/${encodeURIComponent(
        exemplarId
      )}`
    );
    return response.data;
  },
  postCriarEmprestimo: async (data) => {
    const response = await api.post("/emprestimos/salvar", data);
    return response.data;
  },
  getTodosEmprestimos: async () => {
    const response = await api.get("/emprestimos/vigentes");
    return response.data;
  },
};

export default emprestimoService;
