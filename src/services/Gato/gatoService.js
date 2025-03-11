import apiGato from "./apiGato";

const gatoService = {
  getFotoGatinho: async () => {
    const response = await apiGato.get("/images/search?limit=1");
    return response.data;
  },
};

export default gatoService;
