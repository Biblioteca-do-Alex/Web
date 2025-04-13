import styles from "./BotaoGrande.module.css";

function BotaoGrande(props) {
  if (props.status == "sim") {
    if (props.cor == "branco") {
      return (
        <button
          onClick={props.onClick}
          className={`${styles.botao} ${styles.branco}`}
        >
          {props.texto}
        </button>
      );
    } else {
      return (
        <button
          onClick={props.onClick}
          className={`${styles.botao} ${styles.roxo}`}
        >
          {props.texto}
        </button>
      );
    }
  }else{
    if (props.cor == "branco") {
        return (
          <button title="Livro não disponível para reserva"
            className={`${styles.botao} ${styles.inativoBranco}`}
          >
            {props.texto}
          </button>
        );
      } else {
        return (
          <button
          title="Livro não disponível para empréstimo"
            className={`${styles.botao}  ${styles.inativoRoxo}`}
          >
            {props.texto}
          </button>
        );
      }
  }
}

export default BotaoGrande;
