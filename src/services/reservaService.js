import api from "./api";

const reservaService = {
  getReservas: async (userId) => {
    const response = await api.get(
      `/reservas/buscarPorUser/${encodeURIComponent(userId)}`
    );
    return response.data;
  },
  getReservaPorUserEExemplar: async (userId, exemplarId) => {
    const response = await api.get(
      `/reservas/buscarPorLivroEId?userId=${encodeURIComponent(
        userId
      )}&exemplarId=${encodeURIComponent(exemplarId)}`
    );
    return response.data;
  },
  postCriarReserva: async (data) => {
    const response = await api.post("/reservas/salvar", data);
    return response.data;
  },
  deletarReserva: async (userId, exemplarId) => {
    const response = await api.post(
      `/reservas/deletar/${encodeURIComponent(userId)}/${encodeURIComponent(
        exemplarId
      )}`
    );
    return response.data;
  },
  getTodasReservas: async () => {
    const response = await api.get("/reservas/vigentes");
    return response.data;
  },
};

export default reservaService;
