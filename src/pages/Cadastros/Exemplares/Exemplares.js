import { useEffect, useState } from "react";
import styles from "./Exemplares.module.css";
import BotaoMedio from "../../../components/BotaoMedio/BotaoMedio";
import Loading from "../../../components/Loading/Loading";
import Alerta from "../../../components/Alerta/Alerta";
import exemplarService from "../../../services/exemplarService";
import livroService from "../../../services/livroService";

function Exemplares(props) {
  const [identificador, setIdentificador] = useState("");
  const [erroIdentificador, setErroIdentificador] = useState(false);
  const [ibsn, setIbsn] = useState("");
  const [status, setStatus] = useState("");
  const [carregar, setCarregar] = useState(false);
  const [livros, setlivros] = useState([]);
  const [alerta, setAlerta] = useState();

  const fetchLivros = async () => {
    setCarregar(true);
    try {
      const data = await livroService.getLivros();
      setCarregar(false);
      if (data != null) {
        setlivros(data);
      } else {
        setAlerta({
          tipo: "error",
          mensagem: "Erro ao buscar livros",
          tempo: 3000,
        });
      }
    } catch (error) {
      setAlerta({
        tipo: "error",
        mensagem: "Erro ao comunicar com o servidor",
        tempo: 3000,
      });
    }
  };

  useEffect(() => {
    fetchLivros();
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
      const fetchExemplar = async () => {
        try {
          const exemplar = {
            identificador: identificador,
            ibsn: ibsn,
            status: status,
          };
          const data = await exemplarService.postSalvar(exemplar);
          setCarregar(false);
          if (data != null) {
            setAlerta({
              tipo: "success",
              mensagem: "Exemplar cadastrado com sucesso",
              tempo: 4000,
            });
            setIdentificador("");
            setIbsn("");
            setStatus("");
          } else {
            setAlerta({
              tipo: "error",
              mensagem: "Erro ao cadastrar exemplar",
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
      fetchExemplar();
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
                  .sort((a, b) => a.titulo.localeCompare(b.titulo))
                  .map((livro) => (
                    <option value={livro.ibsn}>{livro.titulo}</option>
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
                <option value="Disponível">Disponível</option>
                <option value="Indisponível">Indisponível</option>
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
