import styles from "./Login.module.css";
import BotaoMedio from "../../components/BotaoMedio/BotaoMedio";
import { useState } from "react";
import olhoFechado from "../../assets/olho-fechado.svg";
import olhoAberto from "../../assets/olho-aberto.svg";
import validacoes from "../../utils/validacao";
import Loading from "../../components/Loading/Loading";
import authService from "../../services/authService";

function Login(props) {
  const [visivel, setVisivel] = useState(false);
  const [tipo, setTipo] = useState("password");
  const [senha, setSenha] = useState("");
  const [erroSenha, setErroSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [erroEmail, setErroEmail] = useState(false);
  const [carregar, setCarregar] = useState(false);

  function mostrarSenha() {
    setVisivel(!visivel);
    setTipo(visivel ? "password" : "text");
  }

  function validaDados() {
    let valido = true;
    if (email == "") {
      setErroEmail(true);
      setTimeout(() => {
        setErroEmail(false);
      }, 6000);
      alert("digite o email");
      valido = false;
    } else if (validacoes.validarEmail(email) == false) {
      setErroEmail(true);
      setTimeout(() => {
        setErroEmail(false);
      }, 6000);
      alert("email invalido");
      valido = false;
    } else {
      setErroEmail(false);
    }

    if (senha == "") {
      setErroSenha(true);
      setTimeout(() => {
        setErroSenha(false);
      }, 6000);
      alert("digite a senha");
      valido = false;
    } else if (senha.length <= 4) {
      setErroSenha(true);
      setTimeout(() => {
        setErroSenha(false);
      }, 6000);
      alert("senha muito curta, deve ter pelo menos 5 caracteres");
      valido = false;
    } else {
      setErroSenha(false);
    }

    if (valido) {
      setCarregar(true);
      const fetchLogin = async () => {
        try {
          const data = await authService.getLogin();
          setTimeout(() => {
            setCarregar(false);
            if (data != null) {
              props.setLogado(true);
              props.setAdmin(false);
              props.setUserId("1234")
            } else {
              alert("Erro ao efetuar login");
            }
          }, 3000);
        } catch (error) {
          alert("Erro ao comunicar com o servidor");
        }
      };
      fetchLogin();
    }
  }

  return (
    <>
      <div className={styles.login}>
        <h2 className={styles.titulo}>Login</h2>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            placeholder="Email"
            className={`${erroEmail ? styles.erro : ""} ${styles.input} `}
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={styles.label} htmlFor="senha">
            Senha
          </label>
          <div className={styles.senha}>
            <input
              placeholder="Senha"
              className={`${erroSenha ? styles.erro : ""} ${styles.input} `}
              type={tipo}
              name="senha"
              id="senha"
              onChange={(e) => setSenha(e.target.value)}
            />
            <img
              className={styles.olho}
              src={visivel ? olhoAberto : olhoFechado}
              onClick={mostrarSenha}
              alt="Mostrar senha"
            />
          </div>
        </div>
        <BotaoMedio texto="Acessar" onClick={validaDados} />
      </div>
      <Loading carregar={carregar} />
    </>
  );
}

export default Login;
