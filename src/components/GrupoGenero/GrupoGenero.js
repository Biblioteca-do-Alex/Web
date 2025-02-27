import styles from "./GrupoGenero.module.css";
import LivroIcone from "../../components/LivroIcone/LivroIcone";
function GrupoGenero(props) {
  if (props.livros.length > 0) {
    return (
      <>
        <h2>{props.genero}</h2>
        <div className={styles.livrosDiv}>
          {props.livros.map((livro) => (
            <LivroIcone
              key={livro.id}
              nome={livro.nome}
              autor={livro.autor}
              foto={livro.foto}
            />
          ))}
        </div>
      </>
    );
  } else {
    return <></>;
  }
}
export default GrupoGenero;
