import styles from "./Catalogo.module.css";
import Busca from "../../components/Busca/Busca";

import { useState, useEffect } from "react";
import GrupoLivros from "../../components/GrupoLivros/GrupoLivros";

function Catalogo() {
  const [busca, setBusca] = useState("");
  const [generos, setGeneros] = useState(["Romance", "Fantasia"]);
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    const livro = [
      {
        id: "1234",
        nome: "A Hipótese do Amor",
        autor: "Ali Hazelwood",
        colecao: "",
        genero: "Romance",
        foto: "https://m.media-amazon.com/images/I/71dsFCsDGYL._UF894,1000_QL80_.jpg",
      },
      {
        id: "4321",
        nome: "Harry Potter",
        autor: "J.K. Rowling",
        colecao: "Magia",
        genero: "Fantasia",
        foto: "https://m.media-amazon.com/images/I/81ibfYk4qmL.jpg",
      },
    ];
    setCatalogo(livro);
  }, []);

  function retorno() {
    if (busca == "") {
      return (
        <>
          {generos.map((genero) => (
            <GrupoLivros
              titulo={genero}
              livros={catalogo.filter((livro) => livro.genero == genero)}
            />
          ))}
        </>
      );
    } else {
      return (
        <>
          <GrupoLivros
            titulo={`Resultado da pesquisa ${busca}`}
            mensagem={`Não foi possível encontrar livros com o nome '${busca}'`}
            livros={catalogo.filter(
              (livro) =>
                livro.nome.toLowerCase().includes(busca.toLowerCase()) ||
                livro.autor.toLowerCase().includes(busca.toLowerCase()) ||
                livro.colecao.toLowerCase().includes(busca.toLowerCase())
            )}
          />
        </>
      );
    }
  }

  return (
    <div className={styles.container}>
      <Busca busca={busca} setBusca={setBusca} />
      {retorno()}
    </div>
  );
}

export default Catalogo;
