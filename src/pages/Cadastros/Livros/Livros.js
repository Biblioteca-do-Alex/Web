import styles from "./Livros.module.css";
import BotaoMedio from "../../../components/BotaoMedio/BotaoMedio";
import { use, useState } from "react";
import Loading from "../../../components/Loading/Loading";
import Alerta from "../../../components/Alerta/Alerta";

function Livros(props) {
  const [carregar, setCarregar] = useState(false);
  const [ibsn, setIbsn] = useState("");
  const [erroIbsn, setErroIbsn] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [erroTitulo, setErroTitulo] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [erroDescricao, setErroDescricao] = useState(false);
  const [volume, setVolume] = useState("");
  const [erroVolume, setErroVolume] = useState(false);
  const [colecao, setColecao] = useState("");
  const [erroColecao, setErroColecao] = useState(false);
  const [autor, setAutor] = useState("");
  const [erroAutor, setErroAutor] = useState(false);
  const [genero, setGenero] = useState("");
  const [erroGenero, setErroGenero] = useState(false);
  const [editora, setEditora] = useState("");
  const [erroEditora, setErroEditora] = useState(false);
  const [imagem, setImagem] = useState("");
  const [erroImagem, setErroImagem] = useState(false);
  const [livro, setLivro] = useState({});
  const [alerta, setAlerta] = useState();

  function criarLivro() {
    let valido = true;
    if (ibsn == "") {
      setErroIbsn(true);
      setTimeout(() => {
        setErroIbsn(false);
      }, 6000);
      setAlerta({ mensagem: "Digite o IBSN do livro" });
      valido = false;
    } else {
      setErroIbsn(false);
    }

    if (titulo == "") {
      setErroTitulo(true);
      setTimeout(() => {
        setErroTitulo(false);
      }, 6000);
      setAlerta({ mensagem: "Digite o Título do livro" });
      valido = false;
    } else {
      setErroTitulo(false);
    }

    if (descricao == "") {
      setErroDescricao(true);
      setTimeout(() => {
        setErroDescricao(false);
      }, 6000);
      setAlerta({ mensagem: "Digite a Descrição do livro" });
      valido = false;
    } else {
      setErroDescricao(false);
    }

    if (volume != "") {
      if (isNaN(volume)) {
        setErroVolume(true);
        setTimeout(() => {
          setErroVolume(false);
        }, 6000);
        setAlerta({
          mensagem: "O volume deve conter apenas números",
          tempo: 4000,
        });
        valido = false;
      } else {
        setErroVolume(false);
      }
    }

    if (autor == "") {
      setErroAutor(true);
      setTimeout(() => {
        setErroAutor(false);
      }, 6000);
      setAlerta({ mensagem: "Digite o Autor do livro" });
      valido = false;
    } else {
      setErroAutor(false);
    }

    if (genero == "") {
      setErroGenero(true);
      setTimeout(() => {
        setErroGenero(false);
      }, 6000);
      setAlerta({ mensagem: "Digite o Gênero do livro" });
      valido = false;
    } else {
      setErroGenero(false);
    }

    if (editora == "") {
      setErroEditora(true);
      setTimeout(() => {
        setErroEditora(false);
      }, 6000);
      setAlerta({ mensagem: "Digite a Editora do livro" });
      valido = false;
    } else {
      setErroEditora(false);
    }

    if (imagem == "") {
      setErroImagem(true);
      setTimeout(() => {
        setErroImagem(false);
      }, 6000);
      setAlerta({ mensagem: "Anexe a Imagem do livro" });
      valido = false;
    } else {
      setErroImagem(false);
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
        setAlerta({ tipo: "success", mensagem: "Livro criado com sucesso" });
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
                className={`${erroIbsn ? styles.erro : ""}`}
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
                className={`${erroTitulo ? styles.erro : ""}`}
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
                className={`${erroDescricao ? styles.erro : ""}`}
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
                className={`${erroVolume ? styles.erro : ""}`}
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
                className={`${erroColecao ? styles.erro : ""}`}
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
                className={`${erroAutor ? styles.erro : ""}`}
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
                className={`${erroGenero ? styles.erro : ""}`}
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
                className={`${erroEditora ? styles.erro : ""}`}
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
                // accept=".jpg, .png,.jpeg"
                // type="file"
                type="text"
                placeholder="Imagem (Cole uma url)"
                name="imagem"
                className={`${erroImagem ? styles.erro : ""}`}
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
      <Alerta alerta={alerta} />
    </>
  );
}

export default Livros;
