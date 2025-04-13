import styles from "./Catalogo.module.css";
import Busca from "../../components/Busca/Busca";

import { useState, useEffect } from "react";
import GrupoLivros from "../../components/GrupoLivros/GrupoLivros";
import generoService from "../../services/generoService";
import livroService from "../../services/livroService";
import Alerta from "../../components/Alerta/Alerta";
import Loading from "../../components/Loading/Loading";

function Catalogo(props) {
  const [busca, setBusca] = useState("");
  const [generos, setGeneros] = useState([]);
  const [catalogo, setCatalogo] = useState([]);
  const [alerta, setAlerta] = useState();
  const [carregar, setCarregar] = useState(false);

  const fetchLivros = async () => {
    try {
      const data = await livroService.getLivros();
      if (data != null) {
        setCatalogo(data);
      } else {
        setAlerta({
          tipo: "error",
          mensagem: "Erro ao buscar livros",
          tempo: 3000,
        });
      }
    } catch (error) {
      setAlerta({
        tipo: "error",
        mensagem: "Erro ao comunicar com o servidor",
        tempo: 3000,
      });
    }
  };

  const fetchGeneros = async () => {
    try {
      const data = await generoService.getGeneros();
      if (data != null) {
        setGeneros(data);
        fetchLivros();
      } else {
        setAlerta({
          tipo: "error",
          mensagem: "Erro ao buscar gêneros",
          tempo: 3000,
        });
      }
    } catch (error) {
      setAlerta({
        tipo: "error",
        mensagem: "Erro ao comunicar com o servidor",
        tempo: 3000,
      });
    }
  };

  useEffect(() => {
    fetchGeneros();
  }, []);

  function retorno() {
    if (busca == "") {
      return (
        <>
          {generos.map((genero) => (
            <GrupoLivros
              key={genero.id}
              titulo={genero.nome}
              livros={catalogo.filter((livro) => livro.genero == genero.id)}
              usuario={props.usuario}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          <GrupoLivros
            titulo={`Resultado da pesquisa '${busca}'`}
            mensagem={`Não foi possível encontrar livros com o nome '${busca}'`}
            livros={catalogo.filter(
              (livro) =>
                livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
                livro.autor.toLowerCase().includes(busca.toLowerCase()) ||
                livro.colecao.toLowerCase().includes(busca.toLowerCase())
            )}
            usuario={props.usuario}
          />
        </>
      );
    }
  }

  return (
    <div className={styles.container}>
      <Busca busca={busca} setBusca={setBusca} />
      {retorno()}
      <Alerta alerta={alerta} />
      <Loading carregar={carregar} />
    </div>
  );
}

export default Catalogo;
