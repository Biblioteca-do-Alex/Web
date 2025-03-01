import styles from "./LivroIcone.module.css";
import BotaoPequeno from "../BotaoPequeno/BotaoPequeno";

function LivroIcone(props) {
  return (
    <>
      <div className={styles.livro}>
        <img src={props.foto} alt="" className={styles.foto} />
   
        <div className={styles.info}>
          <p className={styles.nome}>{props.nome}</p>
          <p className={styles.autor}>{props.autor}</p>
         <BotaoPequeno texto="Ver" id={props.id}/>
        </div>
      </div>
    </>
  );
}

export default LivroIcone;
