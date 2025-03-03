import styles from "./Livros.module.css";
import BotaoMedio from "../../../components/BotaoMedio/BotaoMedio";
import { use, useState } from "react";
import Loading from "../../../components/Loading/Loading";

function Livros(props) {
  const [carregar, setCarregar] = useState(false);
  const [ibsn, setIbsn] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [volume, setVolume] = useState("");
  const [colecao, setColecao] = useState("");
  const [autor, setAutor] = useState("");
  const [genero, setGenero] = useState("");
  const [editora, setEditora] = useState("");
  const [imagem, setImagem] = useState("");
  const [livro, setLivro] = useState({});

  function criarLivro() {
    let valido = true;
    if (ibsn == "") {
      alert("Digite o IBSN do livro");
      valido = false;
    }
    if (titulo == "") {
      alert("Digite o Título do livro");
      valido = false;
    }
    if (descricao == "") {
      alert("Digite a Descrição do livro");
      valido = false;
    }
    if (volume != "") {
      if (isNaN(volume)) {
        alert("O volume deve ser apenas números");
        valido = false;
      }
    }
    if (autor == "") {
      alert("Digite o Autor do livro");
      valido = false;
    }
    if (genero == "") {
      alert("Digite o Gênero do livro");
      valido = false;
    }
    if (editora == "") {
      alert("Digite a Editora do livro");
      valido = false;
    }
    if (imagem == "") {
      alert("Anexe a Imagem do livro");
      valido = false;
    }
    if (valido) {
      setCarregar(true);
      const livro = {
        ibsn: ibsn,
        titulo: titulo,
        descricao: descricao,
        volume: volume,
        colecao: colecao,
        autor: autor,
        genero: genero,
        editora: editora,
        imagem: imagem,
      };
      setLivro(livro);
      setIbsn("");
      setTitulo("");
      setDescricao("");
      setVolume("");
      setColecao("");
      setAutor("");
      setGenero("");
      setEditora("");
      setImagem("");
      console.log(livro);
      setTimeout(() => {
        setCarregar(false);
        alert("Livro criado com sucesso");
      }, 3000);
    }
  }

  return (
    <>
      <div className={styles.form}>
        <h2>Cadastro de Livros</h2>
        <div className={styles.campos}>
          <div className={styles.linha1}>
            <div className={styles.grupo}>
              <label htmlFor="ibsn">IBSN</label>
              <input
                required
                maxLength="20"
                minLength="13"
                placeholder="IBSN"
                type="text"
                name="ibsn"
                id="ibsn"
                value={ibsn}
                onChange={(e) => {
                  setIbsn(e.target.value);
                }}
              />
            </div>
            <div className={styles.grupo}>
              <label htmlFor="titulo">Titulo</label>
              <input
                required
                minLength="5"
                maxLength="80"
                placeholder="Titulo"
                type="text"
                id="titulo"
                name="titulo"
                value={titulo}
                onChange={(e) => {
                  setTitulo(e.target.value);
                }}
              />
            </div>
            <div className={styles.grupo}>
              <label htmlFor="descricao">Descrição</label>
              <textarea
                required
                minLength="10"
                maxLength="255"
                placeholder="Descrição"
                name="descricao"
                id="descricao"
                value={descricao}
                onChange={(e) => {
                  setDescricao(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className={styles.linha2}>
            <div className={styles.grupo}>
              <label htmlFor="volume">Volume</label>
              <input
                minLength="1"
                maxLength="3"
                placeholder="Volume (Ex: 1, 2, 3...)"
                type="text"
                name="volume"
                id="volume"
                value={volume}
                onChange={(e) => {
                  setVolume(e.target.value);
                }}
              />
            </div>
            <div className={styles.grupo}>
              <label htmlFor="colecao">Coleção</label>
              <input
                minLength="5"
                maxLength="80"
                placeholder="Coleção"
                type="text"
                name="colecao"
                id="colecao"
                value={colecao}
                onChange={(e) => {
                  setColecao(e.target.value);
                }}
              />
            </div>
            <div className={styles.grupo}>
              <label htmlFor="autor">Autor</label>
              <input
                required
                minLength="10"
                maxLength="255"
                placeholder="Autor"
                type="text"
                name="autor"
                id="autor"
                value={autor}
                onChange={(e) => {
                  setAutor(e.target.value);
                }}
              />
            </div>
            <div className={styles.grupo}>
              <label htmlFor="genero">Gênero</label>
              <input
                required
                minLength="5"
                maxLength="80"
                placeholder="Genêro"
                type="text"
                name="genero"
                id="genero"
                value={genero}
                onChange={(e) => {
                  setGenero(e.target.value);
                }}
              />
            </div>
          </div>
          <div className={styles.linha3}>
            <div className={styles.grupo}>
              <label htmlFor="editora">Editora</label>
              <input
                required
                minLength="3"
                maxLength="80"
                placeholder="Editora"
                type="text"
                name="editora"
                id="editora"
                value={editora}
                onChange={(e) => {
                  setEditora(e.target.value);
                }}
              />
            </div>
            <div className={styles.grupo}>
              <label htmlFor="imagem">Imagem</label>
              <input
                required
                accept=".jpg, .png,.jpeg"
                type="file"
                name="imagem"
                id="imagem"
                value={imagem}
                onChange={(e) => {
                  setImagem(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div className={styles.botao}>
          <BotaoMedio texto="Cadastrar" onClick={criarLivro} />
        </div>
      </div>
      <Loading carregar={carregar} />
    </>
  );
}

export default Livros;
