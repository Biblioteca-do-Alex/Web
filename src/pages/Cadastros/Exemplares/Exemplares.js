import { useEffect, useState } from "react";
import styles from "./Exemplares.module.css";
import BotaoMedio from "../../../components/BotaoMedio/BotaoMedio";
import Loading from "../../../components/Loading/Loading";
import Alerta from "../../../components/Alerta/Alerta";

function Exemplares(props) {
  const [identificador, setIdentificador] = useState("");
  const [erroIdentificador, setErroIdentificador] = useState(false);
  const [ibsn, setIbsn] = useState("");
  const [status, setStatus] = useState("");
  const [carregar, setCarregar] = useState(false);
  const [livros, setlivros] = useState([]);
  const [exemplar, setExemplar] = useState({});
  const [alerta, setAlerta] = useState();
  useEffect(() => {
    const livro = [
      {
        id: "1234",
        nome: "Harry Potter",
      },
      {
        id: "5432",
        nome: "A teoria de tudo",
      },
      {
        id: "0987",
        nome: "Como eu era antes de você",
      },
      {
        id: "98765",
        nome: "Trono de vidro",
      },
    ];
    setlivros(livro);
  }, []);

  function criarExemplar() {
    let valido = true;
    if (identificador == "") {
      setErroIdentificador(true);
      setTimeout(() => {
        setErroIdentificador(false);
      }, 6000);
      setAlerta({
        mensagem: "Digite o identificador do exemplar",
        tempo: 4000,
      });
      valido = false;
    } else {
      setErroIdentificador(false);
    }

    if (valido) {
      setCarregar(true);
      const exemplar = {
        identificador: identificador,
        ibsn: ibsn,
        status: status,
      };
      setExemplar(exemplar);
      setIdentificador("");
      setIbsn("");
      setStatus("");
      console.log(exemplar);
      setTimeout(() => {
        setCarregar(false);
        setAlerta({ tipo: "success", mensagem: "Exemplar criado com sucesso" });
      }, 3000);
    }
  }

  return (
    <>
      <div className={styles.form}>
        <h2>Cadastro de Exemplares</h2>
        <div className={styles.campos}>
          <div className={styles.linha}>
            <div className={styles.grupo}>
              <label htmlFor="identificador">Identificador</label>
              <input
                required
                placeholder="Identificador"
                type="text"
                name="identificador"
                id="identificador"
                className={`${erroIdentificador ? styles.erro : ""}`}
                value={identificador}
                onChange={(e) => {
                  setIdentificador(e.target.value);
                }}
              />
            </div>
            <div className={styles.grupo}>
              <label htmlFor="livro">Livro</label>
              <select
                name="livro"
                id="livro"
                value={ibsn}
                onChange={(e) => {
                  setIbsn(e.target.value);
                }}
              >
                {livros
                  .sort((a, b) => a.nome.localeCompare(b.nome))
                  .map((livro) => (
                    <option value={livro.id}>{livro.nome}</option>
                  ))}
              </select>
            </div>
            <div className={styles.grupo}>
              <label htmlFor="status">Status</label>
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option value="0">Disponível</option>
                <option value="1">Reservado</option>
                <option value="2">Emprestado</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.botao}>
          <BotaoMedio texto="Cadastrar" onClick={criarExemplar} />
        </div>
      </div>
      <Loading carregar={carregar} />
      <Alerta alerta={alerta} />
    </>
  );
}

export default Exemplares;
