import api from "./api";

const exemplarService = {
  getExemplarPorId: async (id) => {
    const response = await api.get(`/exemplares/id/${encodeURIComponent(id)}`);
    return response.data;
  },
  postSalvar: async (data) => {
    const response = await api.post("/exemplares/salvar", data);
    return response.data;
  },
  getExemplaresPorIbsn: async (ibsn) => {
    const response = await api.get(
      `/exemplares/ibsn/${encodeURIComponent(ibsn)}`
    );
    return response.data;
  },
};

export default exemplarService;
