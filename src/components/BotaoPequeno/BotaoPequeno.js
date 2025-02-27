import styles from "./BotaoPequeno.module.css";

function BotaoPequeno(props) {
  return <>
  <button className={styles.botao}>{props.texto}</button>
  </>;
}

export default BotaoPequeno;
