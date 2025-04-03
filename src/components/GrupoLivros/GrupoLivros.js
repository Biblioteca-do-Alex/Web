import styles from "./GrupoLivros.module.css";
import LivroIcone from "../LivroIcone/LivroIcone";
function GrupoLivros(props) {
  if (props.livros.length > 0) {
    return (
      <>
        <h2>{props.titulo}</h2>
        <div className={styles.livrosDiv}>
          {props.livros.map((livro) => (
            <LivroIcone
              key={livro.id}
              livro={livro}
            />
          ))}
        </div>
      </>
    );
  } else {
    return (
      <>
        <h2 className={styles.mensagem}>{props.mensagem}</h2>
      </>
    );
  }
}
export default GrupoLivros;
