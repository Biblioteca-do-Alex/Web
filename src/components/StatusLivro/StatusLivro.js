import styles from "./StatusLivro.module.css";

function StatusLivro(props) {
  return (
    <>
      <div className={styles.container}>
        <span className={`${styles.status} ${styles[props.cor]}`}>{props.status}</span>
        <p className={styles.mensagem}>{props.mensagem}</p>
      </div>
    </>
  );
}

export default StatusLivro;
