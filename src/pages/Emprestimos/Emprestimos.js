import styles from "./Emprestimos.module.css";
import GrupoLivros from "../../components/GrupoLivros/GrupoLivros";
import { useEffect, useState } from "react";
import Busca from "../../components/Busca/Busca";
function Emprestimos() {
  const [reservas, setReservas] = useState([]);
  const [emprestimos, setEmprestmos] = useState([]);
  const [livrosGeral, setLivrosGeral] = useState([]);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    setLivrosGeral([...reservas, ...emprestimos]);
  }, [reservas, emprestimos]);

  useEffect(() => {
    const livro = [
      {
        id: "4321",
        nome: "Harry Potter",
        autor: "J.K. Rowling",
        colecao: "Harry Potter",
        genero: "Fantasia",
        foto: "https://m.media-amazon.com/images/I/81ibfYk4qmL.jpg",
      },
    ];
    setReservas(livro);
  }, []);
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
    ];
    setEmprestmos(livro);
  }, []);

  function retorno() {
    if (busca == "") {
      return (
        <>
          <GrupoLivros titulo="Meus livros emprestados " livros={emprestimos} />
          <GrupoLivros titulo="Meus livros reservados " livros={reservas} />
        </>
      );
    } else {
      return (
        <>
          <GrupoLivros
            titulo={`Resultado da pesquisa '${busca}'`}
            mensagem={`Não foi possível encontrar livros com o nome '${busca}'`}
            livros={livrosGeral.filter(
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

export default Emprestimos;
