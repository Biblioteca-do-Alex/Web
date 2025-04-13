import styles from "./Usuario.module.css";
import BotaoMedio from "../../../components/BotaoMedio/BotaoMedio";
import Loading from "../../../components/Loading/Loading";
import { useState } from "react";
import validacoes from "../../../utils/validacao";
import userService from "../../../services/userService";
import { Navigate, useNavigate } from "react-router-dom";
import Alerta from "../../../components/Alerta/Alerta";

function Usuario(props) {
  const [carregar, setCarregar] = useState(false);
  const [alerta, setAlerta] = useState();
  const [nome, setNome] = useState("");
  const [erroNome, setErroNome] = useState(false);
  const [endereco, setEndereco] = useState("");
  const [erroEndereco, setErroEndereco] = useState(false);
  const [telefone, setTelefone] = useState("");
  const [erroTelefone, setErroTelefone] = useState(false);
  const [email, setEmail] = useState("");
  const [erroEmail, setErroEmail] = useState(false);
  const [senha, setSenha] = useState("");
  const [erroSenha, setErroSenha] = useState(false);
  const navigate = useNavigate();

  function validaDados() {
    let valido = true;
    if (nome == "") {
      setErroNome(true);
      setTimeout(() => {
        setErroNome(false);
      }, 6000);
      setAlerta({ mensagem: "Digite seu nome" });
      valido = false;
    } else {
      setErroNome(false);
    }

    if (endereco == "") {
      setErroEndereco(true);
      setTimeout(() => {
        setErroEndereco(false);
      }, 6000);
      setAlerta({
        mensagem: "Digite seu endereço completo",
        tempo: 3000,
      });
      valido = false;
    } else {
      setErroEndereco(false);
    }

    if (telefone == "") {
      setErroTelefone(true);
      setTimeout(() => {
        setErroTelefone(false);
      }, 6000);
      setAlerta({
        mensagem: "Digite seu telefone",
        tempo: 3000,
      });
      valido = false;
    } else {
      if (isNaN(telefone)) {
        setErroTelefone(true);
        setTimeout(() => {
          setErroTelefone(false);
        }, 6000);
        setAlerta({
          mensagem: "O telefone deve conter apenas números",
          tempo: 4000,
        });
        valido = false;
      } else {
        setErroTelefone(false);
      }
    }

    if (email == "") {
      setErroEmail(true);
      setTimeout(() => {
        setErroEmail(false);
      }, 6000);
      setAlerta({
        mensagem: "Digite seu e-mail",
        tempo: 3000,
      });
      valido = false;
    } else if (validacoes.validarEmail(email) == false) {
      setErroEmail(true);
      setTimeout(() => {
        setErroEmail(false);
      }, 6000);
      setAlerta({
        mensagem: "Digite um e-mail válido",
        tempo: 3000,
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
      setAlerta({ mensagem: "Digite sua senha" });
      valido = false;
    } else if (senha.length <= 4) {
      setErroSenha(true);
      setTimeout(() => {
        setErroSenha(false);
      }, 6000);
      setAlerta({
        mensagem: "Senha muito curta, deve conter pelo menos 5 caracteres",
        tempo: 4500,
      });
      valido = false;
    } else {
      setErroSenha(false);
    }

    if (valido) {
      setCarregar(true);
      const fetchLogin = async () => {
        try {
          const usuario = {
            nome: nome,
            endereco: endereco,
            telefone: validacoes.formatarTelefone(telefone),
            email: email,
            senha: senha,
          };
          console.log(usuario)
          const data = await userService.postSalvar(usuario);
          setCarregar(false);
          if (data != null) {
            setAlerta({
              tipo: "success",
              mensagem: "Usuário cadastrado com sucesso",
              tempo: 4000,
            });
            setNome("");
            setEndereco("");
            setTelefone("");
            setEmail("");
            setSenha("");
            setTimeout(() => {
              navigate("/login");
            }, 5000);
          } else {
            setAlerta({
              tipo: "error",
              mensagem: "Erro ao cadastrar usuário",
              tempo: 3000,
            });
            setCarregar(false);
          }
        } catch (error) {
          setAlerta({
            tipo: "error",
            mensagem: "Erro ao comunicar com o servidor",
            tempo: 3000,
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
        <h2 className={styles.titulo}>Cadastro</h2>
        <div className={styles.container}>
          <label className={styles.label} htmlFor="nome">
            Nome
          </label>
          <input
            placeholder="Nome"
            className={`${erroNome ? styles.erro : ""} ${styles.input} `}
            type="text"
            name="nome"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <label className={styles.label} htmlFor="endereco">
            Endereço
          </label>
          <input
            placeholder="Endereço"
            className={`${erroEndereco ? styles.erro : ""} ${styles.input} `}
            type="text"
            name="endereco"
            id="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
          />
          <label className={styles.label} htmlFor="telefone">
            Telefone
          </label>
          <input
            placeholder="Telefone"
            className={`${erroTelefone ? styles.erro : ""} ${styles.input} `}
            type="text"
            name="telefone"
            id="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />
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
          <input
            placeholder="Senha"
            className={`${erroSenha ? styles.erro : ""} ${styles.input} `}
            type="text"
            name="senha"
            id="senha"
            minLength="6"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                validaDados();
              }
            }}
          />
        </div>
        <BotaoMedio texto="Cadastrar" onClick={validaDados} />
      </div>
      <Loading carregar={carregar} />
      <Alerta alerta={alerta} />
    </>
  );
}

export default Usuario;
