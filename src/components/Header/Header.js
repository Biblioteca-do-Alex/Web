import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/logo-branca.png";
import gatoService from "../../services/Gato/gatoService";

function Header(props) {
  const [selecionado, setSelecionado] = useState("Livros");
  const [fotoGato, setFotoGato] = useState("");
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  function mudarSelecao(texto) {
    if (texto === "Cadastros") {
      setMostrarDropdown(!mostrarDropdown);
      setSelecionado("Cadastros");
    } else {
      setSelecionado(texto);
      setMostrarDropdown(false);
      navigate(texto === "Livros" ? "/" : "/emprestimos");
    }
  }

  function navegarPara(pagina) {
    navigate(pagina);
    setMostrarDropdown(false);
  }
  function emprestimo() {
    if (props.usuario.role == "ADMIN") {
      return <></>;
    } else {
      return (
        <p
          className={`${styles.textoHeader} ${
            selecionado === "Empréstimos" ? styles.selecionado : ""
          }`}
          onClick={() => mudarSelecao("Empréstimos")}
        >
          Empréstimos
        </p>
      );
    }
  }
  function admin() {
    if (props.usuario.role == "ADMIN") {
      return (
        <div className={styles.containerDropdown} ref={dropdownRef}>
          <p
            className={`${styles.textoHeader} ${
              selecionado === "Cadastros" ? styles.selecionado : ""
            }`}
            onClick={() => mudarSelecao("Cadastros")}
          >
            Cadastros
          </p>

          {mostrarDropdown && (
            <div className={styles.dropdown}>
              <p onClick={() => navegarPara("/cadastros/livros")}>Livro</p>
              <p onClick={() => navegarPara("/cadastros/exemplares")}>
                Exemplar
              </p>
            </div>
          )}
        </div>
      );
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMostrarDropdown(false);
        if (selecionado === "Cadastros") setSelecionado("");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selecionado]);

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
          {emprestimo()}
          {admin()}
        </div>
        <div className={styles.containerFinal}>
          <p className={styles.nome}>
            {props.usuario ? props.usuario.nome : "Sem nome"}
          </p>
          <img
            className={styles.gato}
            src={fotoGato}
            alt=""
            onClick={() => {
              const logout = window.confirm("Deseja fazer logout?");
              if (logout) {
                props.setLogado(false);
                props.setUsuario();
                navegarPara("/");
              } else {
                window.open(fotoGato, "_blank");
              }
            }}
          />
        </div>
      </header>
    </>
  );
}

export default Header;
