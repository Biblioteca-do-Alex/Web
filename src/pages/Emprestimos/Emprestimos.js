import styles from "./Emprestimos.module.css";
import GrupoLivros from "../../components/GrupoLivros/GrupoLivros";
import { useEffect, useState } from "react";
import Busca from "../../components/Busca/Busca";
import emprestimoService from "../../services/emprestimoService";
import reservaService from "../../services/reservaService";
import exemplarService from "../../services/exemplarService";
import livroService from "../../services/livroService";
import Alerta from "../../components/Alerta/Alerta";

function Emprestimos({ usuario }) {
  const [reservas, setReservas] = useState([]);
  const [emprestimos, setEmprestimos] = useState([]);
  const [livrosReservas, setLivrosReservas] = useState([]);
  const [livrosEmprestimos, setLivrosEmprestimos] = useState([]);
  const [exemplaresReservas, setExemplaresReservas] = useState([]);
  const [exemplaresEmprestimos, setExemplaresEmprestimos] = useState([]);
  const [livrosGeral, setLivrosGeral] = useState([]);
  const [busca, setBusca] = useState("");
  const [alerta, setAlerta] = useState(null);

  const fetchLivro = async (ibsn, setLivros) => {
    try {
      const data = await livroService.getLivroPorIbsn(ibsn);
      if (data) {
        setLivros((prev) =>
          prev.some((livro) => livro.ibsn === data.ibsn)
            ? prev
            : [...prev, data]
        );
      }
    } catch (error) {
      if (error.response.status != 404) {
        setAlerta({
          tipo: "error",
          mensagem: "Erro ao buscar livro",
          tempo: 3000,
        });
      }
    }
  };

  const fetchExemplar = async (ExemplarId, setExemplares, setLivros) => {
    try {
      const data = await exemplarService.getExemplarPorId(ExemplarId);
      if (Array.isArray(data) && data.length > 0) {
        const exemplar = data[0];
        setExemplares((prev) =>
          prev.some((item) => item.id === exemplar.id)
            ? prev
            : [...prev, exemplar]
        );
        fetchLivro(exemplar.ibsn, setLivros);
      }
    } catch (error) {
      if (error.response.status != 404) {
        setAlerta({
          tipo: "error",
          mensagem: "Erro ao buscar exemplar",
          tempo: 3000,
        });
      }
    }
  };

  const fetchEmprestimos = async () => {
    try {
      const data = await emprestimoService.getEmprestimos(usuario.id);
      if (data) {
        setEmprestimos(data);
        data.forEach((emprestimo) =>
          fetchExemplar(
            emprestimo.exemplarId,
            setExemplaresEmprestimos,
            setLivrosEmprestimos
          )
        );
      }
    } catch (error) {
      if (error.response.status != 404) {
        setAlerta({
          tipo: "error",
          mensagem: "Erro ao buscar empréstimos",
          tempo: 3000,
        });
      }
    }
  };

  const fetchReservas = async () => {
    try {
      const data = await reservaService.getReservas(usuario.id);
      if (data) {
        setReservas(data);
        data.forEach((reserva) =>
          fetchExemplar(
            reserva.exemplarId,
            setExemplaresReservas,
            setLivrosReservas
          )
        );
      }
    } catch (error) {
      if (error.response.status != 404) {
        setAlerta({
          tipo: "error",
          mensagem: "Erro ao buscar reservas",
          tempo: 3000,
        });
      }
    }
  };

  useEffect(() => {
    if (usuario?.id) {
      fetchEmprestimos();
      fetchReservas();
    }
  }, [usuario]);

  useEffect(() => {
    const livrosUnicos = [
      ...new Map(
        [...livrosReservas, ...livrosEmprestimos].map((livro) => [
          livro.ibsn,
          livro,
        ])
      ).values(),
    ];
    setLivrosGeral(livrosUnicos);
  }, [livrosEmprestimos, livrosReservas]);

  function retorno() {
    if (busca === "") {
      if (livrosEmprestimos.length > 0 || livrosReservas.length > 0) {
        return (
          <>
            {livrosEmprestimos.length > 0 && (
              <GrupoLivros
                titulo="Meus livros emprestados"
                livros={livrosEmprestimos}
                usuario={usuario}
              />
            )}
            {livrosReservas.length > 0 && (
              <GrupoLivros
                titulo="Meus livros reservados"
                livros={livrosReservas}
                usuario={usuario}
              />
            )}
          </>
        );
      } else {
        return (
          <GrupoLivros
            mensagem="Você ainda não tem nenhum empréstimo ou reserva :("
            livros={[]}
            usuario={usuario}
          />
        );
      }
    } else {
      const livrosFiltrados = livrosGeral.filter(
        (livro) =>
          livro.titulo?.toLowerCase().includes(busca.toLowerCase()) ||
          livro.autor?.toLowerCase().includes(busca.toLowerCase()) ||
          livro.colecao?.toLowerCase().includes(busca.toLowerCase())
      );

      return (
        <GrupoLivros
          titulo={`Resultado da pesquisa '${busca}'`}
          mensagem={
            livrosFiltrados.length === 0
              ? `Nenhum livro encontrado para '${busca}'`
              : ""
          }
          livros={livrosFiltrados}
          usuario={usuario}
        />
      );
    }
  }

  return (
    <div className={styles.container}>
      <Busca busca={busca} setBusca={setBusca} />
      {retorno()}
      <Alerta alerta={alerta} />
    </div>
  );
}

export default Emprestimos;
