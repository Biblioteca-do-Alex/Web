import styles from "./BotaoMedio.module.css";

function BotaoMedio(props) {
  return <button onClick={props.onClick} className={styles.botao}>{props.texto}</button>;
}

export default BotaoMedio;
