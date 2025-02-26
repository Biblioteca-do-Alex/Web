import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo-branca.png";
import gatoService from "../../services/gatoService";

function Header(props) {
  const [selecionado, setSelecionado] = useState("Livros");
  const [fotoGato, setFotoGato] = useState(
    "https://www.petz.com.br/blog/wp-content/uploads/2019/07/vida-de-gato.jpg"
  );
  const navigate = useNavigate();

  function mudarSelecao(texto) {
    setSelecionado(texto);
    if (texto === "Livros") {
      navigate("/"); //
    } else if (texto == "Empréstimos") {
      navigate("/emprestimos");
    } else {
      navigate("/cadastros");
    }
  }

  function admin() {
    if (props.admin) {
      return (
        <p
          className={`${styles.textoHeader} ${
            selecionado === "Cadastros" ? styles.selecionado : ""
          }`}
          onClick={() => mudarSelecao("Cadastros")}
        >
          Cadastros
        </p>
      );
    }
  }

  const fetchFotoGato = async () => {
    try {
      const data = await gatoService.getFotoGatinho();
      if (data != null) {
        setFotoGato(data[0].url);
      } else {
        console.log("Erro ao trazer a foto");
      }
    } catch (error) {
      console.log("Erro ao comunicar com o servidor");
    }
  };
  useEffect(() => {
    fetchFotoGato();
  }, []);

  return (
    <>
      <header className={styles.container}>
        <img
          className={styles.logo}
          src={logo}
          alt=""
          onClick={() => mudarSelecao("Livros")}
        />
        <div className={styles.textos}>
          <p
            className={`${styles.textoHeader} ${
              selecionado === "Livros" ? styles.selecionado : ""
            }`}
            onClick={() => mudarSelecao("Livros")}
          >
            Livros
          </p>
          <p
            className={`${styles.textoHeader} ${
              selecionado === "Empréstimos" ? styles.selecionado : ""
            }`}
            onClick={() => mudarSelecao("Empréstimos")}
          >
            Empréstimos
          </p>
          {admin()}
        </div>
        <img className={styles.gato} src={fotoGato} alt="" />
      </header>
    </>
  );
}

export default Header;
