import styles from "./BotaoPequeno.module.css";
import { useNavigate } from "react-router-dom";

function BotaoPequeno(props) {
  const navigate = useNavigate();
  return (
    <button
      className={styles.botao}
      onClick={() => navigate(`/livro/${props.id}`)}
    >
      {props.texto}
    </button>
  );
}

export default BotaoPequeno;
