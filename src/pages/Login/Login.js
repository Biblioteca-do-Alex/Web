import styles from "./Login.module.css";
import BotaoMedio from "../../components/BotaoMedio/BotaoMedio";
import { useEffect, useState } from "react";
import olhoFechado from "../../assets/olho-fechado.svg";
import olhoAberto from "../../assets/olho-aberto.svg";
import validacoes from "../../utils/validacao";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import Alerta from "../../components/Alerta/Alerta";
import userService from "../../services/userService";

function Login(props) {
  const [visivel, setVisivel] = useState(false);
  const [tipo, setTipo] = useState("password");
  const [senha, setSenha] = useState("");
  const [erroSenha, setErroSenha] = useState(false);
  const [email, setEmail] = useState("");
  const [erroEmail, setErroEmail] = useState(false);
  const [carregar, setCarregar] = useState(false);
  const [alerta, setAlerta] = useState();
  const navigate = useNavigate();

  function mostrarSenha() {
    setVisivel(!visivel);
    setTipo(visivel ? "password" : "text");
  }

  function validaDados() {
    setCarregar(true);
    let valido = true;
    if (email == "") {
      setErroEmail(true);
      setTimeout(() => {
        setErroEmail(false);
      }, 6000);
      setAlerta({ mensagem: "Digite o e-mail", tempo: 4000 });
      valido = false;
    } else if (validacoes.validarEmail(email) == false) {
      setErroEmail(true);
      setTimeout(() => {
        setErroEmail(false);
      }, 6000);
      setAlerta({
        mensagem: "Digite um e-mail válido",
        tempo: 4000,
      });
      valido = false;
    } else {
      setErroEmail(false);
    }

    if (senha == "") {
      setErroSenha(true);
      setTimeout(() => {
        setErroSenha(false);
      }, 6000);
      setAlerta({ mensagem: "Digite a senha", tempo: 4000 });
      valido = false;
    } else if (senha.length <= 4) {
      setErroSenha(true);
      setTimeout(() => {
        setErroSenha(false);
      }, 6000);
      setAlerta({
        mensagem: "Senha muito curta, ela deve ter pelo menos 5 caracteres",
        tempo: 5000,
      });
      valido = false;
    } else {
      setErroSenha(false);
    }

    if (valido) {
      const fetchLogin = async () => {
        try {
          const login = {
            email: email,
            senha: senha,
          };
          const data = await userService.postLogin(login);
          setTimeout(() => {
            setCarregar(false);
          }, 2000);
          if (data != null) {
            setEmail("");
            setSenha("");
            if (data.role == "ADMIN") {
              props.setTituloPagina("Biblioteca do Alex Admin");
              props.setAdmin(true);
            }
            setTimeout(() => {
              props.setLogado(true);
              props.setUsuario(data);
            }, 1000);
          } else {
            setAlerta({
              tipo: "error",
              mensagem: "Erro ao efetuar login",
              tempo: 4000,
            });
            setCarregar(false);
          }
        } catch (error) {
          setAlerta({
            tipo: "error",
            mensagem: "Erro ao comunicar com o servidor",
            tempo: 5000,
          });
          setCarregar(false);
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
            value={email}
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
              value={senha}
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
        <p className={styles.texto}>
          Não tem conta?{" "}
          <span
            onClick={(e) => {
              navigate("/cadastros/usuario");
            }}
          >
            Cadastre-se
          </span>
        </p>
      </div>
      <Loading carregar={carregar} />
      <Alerta alerta={alerta} />
    </>
  );
}

export default Login;
