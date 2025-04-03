import api from "./api";

const emprestimoService = {
  getEmprestimos: async ( userId ) => {
    const response = await api.get(
      `/emprestimos/buscarPorUsuario/${encodeURIComponent(userId)}`
    );
    return response.data;
  },
};

export default emprestimoService;
