import styles from "./LivroIcone.module.css";
import BotaoPequeno from "../BotaoPequeno/BotaoPequeno";
import { useNavigate } from "react-router-dom";
import imagemPadrao from "../../assets/imagemPadrao.png";

function LivroIcone(props) {
  const navigate = useNavigate();
  function click() {
    if (props.usuario.role == "ADMIN") {
      navigate(`/livroAdmin/${props.livro.ibsn}`);
    } else {
      navigate(`/livro/${props.livro.ibsn}`);
    }
  }
  return (
    <>
      <div className={styles.livro}>
        <img
          src={props.livro.imagem || imagemPadrao}
          alt=""
          className={styles.foto}
        />

        <div className={styles.info}>
          <p className={styles.nome}>{props.livro.titulo}</p>
          <p className={styles.autor}>{props.livro.autor}</p>
          <BotaoPequeno
            texto="Ver"
            usuario={props.usuario}
            onClick={() => click()}
          />
        </div>
      </div>
    </>
  );
}

export default LivroIcone;
