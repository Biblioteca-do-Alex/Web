import styles from "./LivroIcone.module.css";
import BotaoPequeno from "../BotaoPequeno/BotaoPequeno";

function LivroIcone(props) {
  return (
    <>
      <div className={styles.livro}>
        <img src={props.livro.imagem} alt="" className={styles.foto} />

        <div className={styles.info}>
          <p className={styles.nome}>{props.livro.titulo}</p>
          <p className={styles.autor}>{props.livro.autor}</p>
          <BotaoPequeno texto="Ver" id={props.livro.id} />
        </div>
      </div>
    </>
  );
}

export default LivroIcone;
