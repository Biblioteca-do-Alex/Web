import styles from "./DetalheLivroAdmin.module.css";
import { useParams } from "react-router-dom";
import livroService from "../../services/livroService";
import reservaService from "../../services/reservaService";
import emprestimoService from "../../services/emprestimoService";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Alerta from "../../components/Alerta/Alerta";
import Loading from "../../components/Loading/Loading";
import setVoltar from "../../assets/setaVoltar.svg";
import BotaoGrande from "../../components/BotaoGrande/BotaoGrande";
import BotaoPequeno from "../../components/BotaoPequeno/BotaoPequeno";
import validacoes from "../../utils/validacao";
import exemplarService from "../../services/exemplarService";

function DetalheLivroAdmin({ usuario }) {
  const navigate = useNavigate();
  const { ibsn } = useParams();
  const [livro, setLivro] = useState();
  const [alerta, setAlerta] = useState();
  const [carregar, setCarregar] = useState(false);
  const [exemplaresDisponiveis, setExemplaresDisponiveis] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [reservas, setReservas] = useState([]);

  const fetchLivro = async () => {
    setCarregar(true);
    try {
      const data = await livroService.getLivroPorIbsn(ibsn);
      setCarregar(false);
      if (data != null) {
        setLivro(data);
        fetchExemplaresPorIbsn(ibsn);
      } else {
        setAlerta({
          tipo: "error",
          mensagem: "Erro ao buscar livro",
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
  const fetchExemplaresPorIbsn = async () => {
    setCarregar(true);
    try {
      const data = await exemplarService.getExemplaresPorIbsn(ibsn);
      const emprestimos = await emprestimoService.getTodosEmprestimos();
      const reservas = await reservaService.getTodasReservas();
      setCarregar(false);

      if (data != null) {
        const emprestados = [];
        const reservados = [];
        const disponiveis = [];

        data.forEach((exemplar) => {
          if (exemplar.status === "Disponível") {
            disponiveis.push(exemplar);
          } else if (exemplar.status === "Emprestado") {
            emprestados.push(exemplar);
          } else {
            reservados.push(exemplar);
          }
        });

        setEmprestimos(
          emprestimos.filter((emp) =>
            emprestados.some((ex) => ex.id === emp.exemplarId)
          )
        );

        setReservas(
          reservas.filter((res) =>
            reservados.some((ex) => ex.id === res.exemplarId)
          )
        );

        setExemplaresDisponiveis(disponiveis);
      }
    } catch (error) {
      console.log(error);
      setCarregar(false);
      setAlerta({
        tipo: "error",
        mensagem: "Erro ao comunicar com o servidor",
        tempo: 3000,
      });
    }
  };

  useEffect(() => {
    fetchLivro();
  }, []);

  const checkOutDoEmprestimo = async (emprestimo, exemplarId) => {
    setCarregar(true);
    try {
      emprestimo.dataFimReal = new Date().toISOString().split("T")[0];
      const data = await emprestimoService.postCriarEmprestimo(emprestimo);
      if (data != null) {
        // alterarStatusExemplar(exemplarId, "Disponível");
        setCarregar(false);
        setAlerta({
          tipo: "success",
          mensagem: "CheckOut feito",
          tempo: 3000,
        });
      }
    } catch (error) {
      setCarregar(false);
      setAlerta({
        tipo: "error",
        mensagem: "Erro ao fazer checkOut do exemplar emprestado",
        tempo: 3000,
      });
    }
  };

  const cancelarReserva = async (userId, exemplarId) => {
    setCarregar(true);
    try {
      const data = await reservaService.deletarReserva(userId, exemplarId);
      if (data != null) {
        setCarregar(false);
      }
    } catch (error) {
      setCarregar(false);
      setAlerta({
        tipo: "error",
        mensagem: "Ocorreu um erro ao cancelar reserva",
        tempo: 5000,
      });
    }
  };

  function criarTabela(tipo) {
    if (tipo === "Emprestado" && emprestimos.length > 0) {
      return (
        <>
          <h3>
            Emprestimos{" "}
            <span>
              ({emprestimos.length}{" "}
              {emprestimos.length > 1 ? "exemplares" : "exemplar"})
            </span>
          </h3>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Número do exemplar</th>
                <th>Data Início</th>
                <th>Data Fim</th>
                <th>Status do empréstimo</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {emprestimos.map((emprestimo) => (
                <tr key={emprestimo.id}>
                  <td>{emprestimo.exemplarId}</td>
                  <td>{validacoes.formatarData(emprestimo.dataInicio)}</td>
                  <td>{validacoes.formatarData(emprestimo.dataFimPrevista)}</td>
                  <td>{emprestimo.status}</td>
                  <td>
                    <BotaoPequeno
                      onClick={() =>
                        checkOutDoEmprestimo(emprestimo, emprestimo.exemplarId)
                      }
                      texto="Check-out"
                      cor="azul"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    } else if (tipo === "Reservado" && reservas.length > 0) {
      return (
        <>
          <h3>
            Reservas{" "}
            <span>
              ({reservas.length}{" "}
              {reservas.length > 1 ? "exemplares" : "exemplar"})
            </span>
          </h3>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th>Número do exemplar</th>
                <th>Data início</th>
                <th>Data Fim</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva.id}>
                  <td>{reserva.exemplarId}</td>
                  <td>{validacoes.formatarData(reserva.dataInicio)}</td>
                  <td>{validacoes.formatarData(reserva.dataFimPrevista)}</td>
                  <td>
                    <BotaoPequeno
                      onClick={() =>
                        cancelarReserva(reserva.userId, reserva.exemplarId)
                      }
                      texto="Cancelar"
                      cor="vermelho"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }

    return null;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.cima}>
          <img
            className={styles.seta}
            src={setVoltar}
            alt=""
            onClick={() => navigate("/")}
          />
        </div>
        {livro ? (
          <>
            <div className={styles.livro}>
              <div className={styles.infos}>
                {livro.imagem && (
                  <img
                    className={styles.imagem}
                    src={livro.imagem}
                    alt="Imagem do livro"
                    onClick={() => window.open(livro.imagem, "_blank")}
                  />
                )}

                <div className={styles.textos}>
                  <h1 className={styles.titulo}>{livro.titulo}</h1>
                  <h3 className={styles.autor}>{livro.autor}</h3>
                  <p className={styles.editora}>{livro.editora}</p>
                  <p className={styles.descricao}>{livro.descricao}</p>
                </div>
              </div>
              <div className={styles.tabelas}>
                {emprestimos.length > 0 && reservas.length > 0 && (
                  <>
                    <h1>Controle de Exemplares</h1>

                    <div className={styles.tabelaItem}>
                      {criarTabela("Emprestado", "Empréstimos")}
                    </div>
                    <div className={styles.tabelaItem}>
                      {criarTabela("Reservado", "Reservas")}
                    </div>
                  </>
                )}
                {emprestimos.length > 0 && (
                  <>
                    <h1>Controle de Exemplares</h1>

                    <div className={styles.tabelaItem}>
                      {criarTabela("Emprestado", "Empréstimos")}
                    </div>
                  </>
                )}
                {reservas.length > 0 && (
                  <>
                    <h1>Controle de Exemplares</h1>

                    <div className={styles.tabelaItem}>
                      {criarTabela("Reservado", "Reservas")}
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <Alerta alerta={alerta} />
        <Loading carregar={carregar} />
      </div>
    </>
  );
}

export default DetalheLivroAdmin;
