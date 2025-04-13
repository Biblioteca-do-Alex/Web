import styles from "./DetalheLivro.module.css";
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
import StatusLivro from "../../components/StatusLivro/StatusLivro";
import validacoes from "../../utils/validacao";
import exemplarService from "../../services/exemplarService";

function DetalheLivro({ usuario }) {
  const navigate = useNavigate();
  const { ibsn } = useParams();
  const [livro, setLivro] = useState();
  const [alerta, setAlerta] = useState();
  const [carregar, setCarregar] = useState(false);
  const [podeReservar, setPodeReservar] = useState("sim");
  const [podePegarEmprestado, setPodePegarEmprestado] = useState("sim");
  const [emprestdoPeloUsuario, setEmprestdoPeloUsuario] = useState();
  const [reservadoPeloUsuario, setReservadoPeloUsuario] = useState();
  const [exemplaresDisponiveis, setExemplaresDisponiveis] = useState([]);
  const [exemplaresEmprestados, setExemplaresEmprestados] = useState([]);
  const [exemplaresReservados, setExemplaresReservados] = useState([]);
  const [exemplaresIndisponiveis, setExemplaresIndisponiveis] = useState([]);

  const verificarReservaFinalizada = async (data) => {
    setCarregar(true);
    if (
      new Date(data.dataInicio).toISOString().split("T")[0] >=
      new Date().toISOString().split("T")[0]
    ) {
      criarEmprestimo(data.exemplarId);
      deletarReserva(data.exemplarId);
    }
    setCarregar(false);
  };

  const criarEmprestimo = async (exemplarId) => {
    setCarregar(true);
    try {
      const emprestimo = {
        userId: usuario.id,
        exemplarId: exemplarId,
        dataInicio: new Date().toISOString().split("T")[0],
        dataFimPrevista: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        status: "EM_DIA",
      };
      const data = await emprestimoService.postCriarEmprestimo(emprestimo);
      if (data != null) {
        alterarStatusExemplar(exemplarId, "Emprestado");
      }
    } catch (error) {
      setCarregar(false);
      setAlerta({
        tipo: "error",
        mensagem: "Erro ao pegar o livro emprestado",
        tempo: 3000,
      });
    }
  };

  const criarReserva = async (exemplarId) => {
    setCarregar(true);
    try {
      const hoje = new Date();
      const dataInicio = new Date(hoje.getTime() + 7 * 24 * 60 * 60 * 1000);
      const dataFimPrevista = new Date(
        dataInicio.getTime() + 14 * 24 * 60 * 60 * 1000
      );
      const reserva = {
        userId: usuario.id,
        exemplarId: exemplarId,
        dataInicio: dataInicio.toISOString().split("T")[0],
        dataFimPrevista: dataFimPrevista.toISOString().split("T")[0],
      };

      const data = await reservaService.postCriarReserva(reserva);
      if (data != null) {
        alterarStatusExemplar(exemplarId, "Reservado");
      }
    } catch (error) {
      setCarregar(false);
      setAlerta({
        tipo: "error",
        mensagem: "Erro ao reservar livro",
        tempo: 3000,
      });
    }
  };

  const deletarReserva = async (exemplarId) => {
    setCarregar(true);
    try {
      const data = await reservaService.deletarReserva(usuario.id, exemplarId);
      if (data != null) {
        setCarregar(false);
      }
    } catch (error) {
      setCarregar(false);
      setAlerta({
        tipo: "error",
        mensagem: "Ocorreu um erro ao realizar o empréstimo do livro reservado",
        tempo: 5000,
      });
    }
  };

  const alterarStatusExemplar = async (exemplarId, status) => {
    setCarregar(true);
    try {
      const exemplar = exemplaresDisponiveis.find((ex) => ex.id === exemplarId);
      exemplar.status = status;
      const data = exemplarService.postSalvar(exemplar);
      if (data != null) {
        setCarregar(false);
        const novosDisponiveis = exemplaresDisponiveis.filter(
          (ex) => ex.id != exemplarId
        );
        setExemplaresDisponiveis(novosDisponiveis);
        fetchEmprestadoPeloUsuario(exemplarId);
        if (status == "Emprestado") {
          fetchEmprestadoPeloUsuario(exemplarId);
          setAlerta({
            tipo: "success",
            mensagem: "Livro emprestado com sucesso",
            tempo: 3000,
          });
        } else {
          fetchReservadoPeloUsuario(exemplarId);
          setAlerta({
            tipo: "success",
            mensagem: "Livro reservado com sucesso",
            tempo: 3000,
          });
        }
      }
    } catch (error) {
      setCarregar(false);
      setAlerta({
        tipo: "error",
        mensagem: "Erro ao pegar o livro emprestado",
        tempo: 3000,
      });
    }
  };

  const renovarLivro = async () => {
    setCarregar(true);
    try {
      const emprestimoRenovado = { ...emprestdoPeloUsuario };
      const dataAtual = new Date(emprestimoRenovado.dataFimPrevista);
      dataAtual.setDate(dataAtual.getDate() + 14);
      emprestimoRenovado.dataFimPrevista = dataAtual
        .toISOString()
        .split("T")[0];

      const data = await emprestimoService.postCriarEmprestimo(
        emprestimoRenovado
      );

      if (data != null) {
        setCarregar(false);
        setEmprestdoPeloUsuario(emprestimoRenovado);
        setAlerta({
          tipo: "success",
          mensagem: "Livro renovado com sucesso!",
          tempo: 3000,
        });
      }
    } catch (error) {
      setCarregar(false);
      setAlerta({
        tipo: "error",
        mensagem: "Erro ao renovaremprestimo",
        tempo: 3000,
      });
    }
  };

  const fetchLivro = async () => {
    setCarregar(true);
    try {
      const data = await livroService.getLivroPorIbsn(ibsn);
      setCarregar(false);
      if (data != null) {
        setLivro(data);
        fetchExemplaresPorIbsn();
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

  const fetchReservadoPeloUsuario = async (exemplarId) => {
    setCarregar(true);
    try {
      const data = await reservaService.getReservaPorUserEExemplar(
        usuario.id,
        exemplarId
      );
      setCarregar(false);
      if (data != null) {
        setReservadoPeloUsuario(data);
        verificarReservaFinalizada(data);
        setPodePegarEmprestado("não");
        setPodeReservar("não");
      }
    } catch (error) {
      if (error.response.status == "404") {
        fetchEmprestadoPeloUsuario(exemplarId);
      } else {
        console.log(error);
      }
    }
  };

  const alterarStatusDoEmprestimo = async (data) => {
    setCarregar(true);
    if (new Date(data.dataFimPrevista) < new Date()) {
      try {
        const emprestimoAtrasado = {
          id: data.id,
          userId: data.userId,
          exemplarId: data.exemplarId,
          dataInicio: data.dataInicio,
          dataFimPrevista: data.dataFimPrevista,
          status: "ATRASADO",
        };
        const data2 = emprestimoService.postCriarEmprestimo(emprestimoAtrasado);
        if (data2 != null) {
          setCarregar(false);
          setAlerta({
            tipo: "warning",
            mensagem: "Atenção!, Seu empréstimo esta atrasado",
            tempo: 4000,
          });
        }
      } catch (error) {
        setCarregar(false);
        setAlerta({
          tipo: "error",
          mensagem: "Erro ao alterar o status do emprestimo no banco",
          tempo: 3000,
        });
      }
    }
  };

  const fetchEmprestadoPeloUsuario = async (exemplarId) => {
    setCarregar(true);
    try {
      const data = await emprestimoService.getEmprestimoPorUserEExemplar(
        usuario.id,
        exemplarId
      );
      setCarregar(false);
      if (data != null) {
        alterarStatusDoEmprestimo(data);
        setEmprestdoPeloUsuario(data);
        setPodePegarEmprestado("não");
        setPodeReservar("não");
      } else {
        setPodePegarEmprestado("sim");
        setPodeReservar("sim");
      }
    } catch (error) {
      if (error.response.status == "404") {
        setCarregar(false);
      } else {
        console.log(error);
      }
    }
  };

  const fetchExemplaresPorIbsn = async () => {
    setCarregar(true);
    try {
      const data = await exemplarService.getExemplaresPorIbsn(ibsn);
      setCarregar(false);
      if (data != null) {
        const emprestados = [];
        const reservados = [];
        const disponiveis = [];

        data.forEach((exemplar) => {
          if (exemplar.status == "Disponível") {
            disponiveis.push(exemplar);
          } else if (exemplar.status == "Emprestado") {
            emprestados.push(exemplar);
          } else {
            reservados.push(exemplar);
          }
        });

        setExemplaresEmprestados(emprestados);
        setExemplaresReservados(reservados);
        setExemplaresDisponiveis(disponiveis);
        setExemplaresIndisponiveis([...emprestados, ...reservados]);

        [...emprestados, ...reservados].forEach((exemplar) => {
          fetchReservadoPeloUsuario(exemplar.id);
        });
      }
    } catch (error) {
      if (error.response.status == "404") {
        setCarregar(false);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchLivro();
  }, []);

  useEffect(() => {
    if (
      Array.isArray(exemplaresEmprestados) &&
      Array.isArray(exemplaresReservados)
    ) {
      setExemplaresIndisponiveis([
        ...exemplaresEmprestados,
        ...exemplaresReservados,
      ]);
    }
  }, [exemplaresEmprestados, exemplaresReservados]);

  if (reservadoPeloUsuario) {
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
                <span className={styles.status}>
                  <StatusLivro
                    cor="amarelo"
                    status="Reservado por você"
                    mensagem={
                      "Você poderá pegar este livro emprestado na data: " +
                      validacoes.formatarData(reservadoPeloUsuario.dataInicio)
                    }
                  />
                </span>
                <div className={styles.infos}>
                  <img
                    className={styles.imagem}
                    src={livro.imagem}
                    alt=""
                    onClick={() => {
                      window.open(livro.imagem, "_blank");
                    }}
                  />
                  <div className={styles.textos}>
                    <h1 className={styles.titulo}>{livro.titulo}</h1>
                    <h3 className={styles.autor}>{livro.autor}</h3>
                    <p className={styles.editora}>{livro.editora}</p>
                    <p className={styles.descricao}>{livro.descricao}</p>
                  </div>
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
  } else if (emprestdoPeloUsuario) {
    if (new Date(emprestdoPeloUsuario.dataFimPrevista) > new Date()) {
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
                  <span className={styles.status}>
                    <StatusLivro
                      cor="verde"
                      status="Em dia"
                      mensagem={
                        "Você deve devolver este livro na data: " +
                        validacoes.formatarData(
                          emprestdoPeloUsuario.dataFimPrevista
                        )
                      }
                    />
                  </span>
                  <div className={styles.infos}>
                    <img
                      className={styles.imagem}
                      src={livro.imagem}
                      alt=""
                      onClick={() => {
                        window.open(livro.imagem, "_blank");
                      }}
                    />
                    <div className={styles.textos}>
                      <h1 className={styles.titulo}>{livro.titulo}</h1>
                      <h3 className={styles.autor}>{livro.autor}</h3>
                      <p className={styles.editora}>{livro.editora}</p>
                      <p className={styles.descricao}>{livro.descricao}</p>
                    </div>
                  </div>
                  <div className={styles.botoes}>
                    <BotaoGrande
                      status="sim"
                      cor="roxo"
                      texto="Renovar"
                      onClick={() => renovarLivro()}
                    />
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
    } else {
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
                  <span className={styles.status}>
                    <StatusLivro
                      cor="vermelho"
                      status="Atrasado"
                      mensagem={
                        "Você deveria ter devolvido este livro na data: " +
                        validacoes.formatarData(
                          emprestdoPeloUsuario.dataFimPrevista
                        )
                      }
                    />
                  </span>
                  <div className={styles.infos}>
                    <img
                      className={styles.imagem}
                      src={livro.imagem}
                      alt=""
                      onClick={() => {
                        window.open(livro.imagem, "_blank");
                      }}
                    />
                    <div className={styles.textos}>
                      <h1 className={styles.titulo}>{livro.titulo}</h1>
                      <h3 className={styles.autor}>{livro.autor}</h3>
                      <p className={styles.editora}>{livro.editora}</p>
                      <p className={styles.descricao}>{livro.descricao}</p>
                    </div>
                  </div>
                  <div className={styles.botoes}>
                    <BotaoGrande status="sim" cor="roxo" texto="Renovar" />
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
  } else if (exemplaresDisponiveis.length > 0) {
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
                <span className={styles.status}>
                  <StatusLivro cor="verde" status="Disponivel" />
                </span>
                <div className={styles.infos}>
                  <img
                    className={styles.imagem}
                    src={livro.imagem}
                    alt=""
                    onClick={() => {
                      window.open(livro.imagem, "_blank");
                    }}
                  />
                  <div className={styles.textos}>
                    <h1 className={styles.titulo}>{livro.titulo}</h1>
                    <h3 className={styles.autor}>{livro.autor}</h3>
                    <p className={styles.editora}>{livro.editora}</p>
                    <p className={styles.descricao}>{livro.descricao}</p>
                  </div>
                </div>
                <div className={styles.botoes}>
                  <BotaoGrande
                    status={podeReservar}
                    cor="branco"
                    texto="Reservar"
                    onClick={() => criarReserva(exemplaresDisponiveis[0].id)}
                  />{" "}
                  <BotaoGrande
                    status={podePegarEmprestado}
                    texto="Pegar emprestado"
                    onClick={() => criarEmprestimo(exemplaresDisponiveis[0].id)}
                  />
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
  } else if (exemplaresReservados.length > 0) {
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
                <span className={styles.status}>
                  <StatusLivro cor="amarelo" status="Reservado" />
                </span>
                <div className={styles.infos}>
                  <img
                    className={styles.imagem}
                    src={livro.imagem}
                    alt=""
                    onClick={() => {
                      window.open(livro.imagem, "_blank");
                    }}
                  />
                  <div className={styles.textos}>
                    <h1 className={styles.titulo}>{livro.titulo}</h1>
                    <h3 className={styles.autor}>{livro.autor}</h3>
                    <p className={styles.editora}>{livro.editora}</p>
                    <p className={styles.descricao}>{livro.descricao}</p>
                  </div>
                </div>
                <div className={styles.botoes}>
                  <BotaoGrande status="não" cor="branco" texto="Reservar" />{" "}
                  <BotaoGrande status="não" texto="Pegar emprestado" />
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
  } else if (exemplaresEmprestados.length > 0) {
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
                <span className={styles.status}>
                  <StatusLivro cor="azul" status="Emprestado" />
                </span>
                <div className={styles.infos}>
                  <img
                    className={styles.imagem}
                    src={livro.imagem}
                    alt=""
                    onClick={() => {
                      window.open(livro.imagem, "_blank");
                    }}
                  />
                  <div className={styles.textos}>
                    <h1 className={styles.titulo}>{livro.titulo}</h1>
                    <h3 className={styles.autor}>{livro.autor}</h3>
                    <p className={styles.editora}>{livro.editora}</p>
                    <p className={styles.descricao}>{livro.descricao}</p>
                  </div>
                </div>
                <div className={styles.botoes}>
                  <BotaoGrande status="não" cor="branco" texto="Reservar" />{" "}
                  <BotaoGrande status="não" texto="Pegar emprestado" />
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
}

export default DetalheLivro;
