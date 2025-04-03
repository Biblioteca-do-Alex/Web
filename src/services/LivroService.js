import api from "./api";

const livroService = {
  postSalvar: async (data) => {
    console.log(data);
    const response = await api.post("/livros/salvar", data);
    return response.data;
  },
  getLivros: async () => {
    const response = await api.get("/livros/tudo");
    return response.data;
  },
  getLivroPorIbsn: async (ibsn) => {
    const response = await api.get(`/livros/ibsn/${encodeURIComponent(ibsn)}`);
    return response.data;
  },
};

export default livroService;
