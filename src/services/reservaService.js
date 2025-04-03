import api from "./api";

const reservaService = {
  getReservas: async ( userId ) => {
    const response = await api.get(
      `/reservas/buscar-por-user/${encodeURIComponent(userId)}`
    );
    return response.data;
  },
};

export default reservaService;
