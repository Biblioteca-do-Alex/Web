import styles from "./BotaoPequeno.module.css";

function BotaoPequeno({ cor, onClick, texto }) {
  const classeFinal = `${styles.botao} ${cor ? styles[cor] : ""}`;

  return (
    <button className={classeFinal} onClick={onClick}>
      {texto}
    </button>
  );
}

export default BotaoPequeno;
