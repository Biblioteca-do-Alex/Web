import styles from "./Loading.module.css";
import gif from "../../assets/loading.gif";

function Loading(props) {
  return (
    <>
      <div
        className={`${styles.container} ${
          props.carregar ? styles.iniciar : styles.parar
        }`}
      >
        <img className={styles.gif} src={gif} alt="" />
      </div>
    </>
  );
}
export default Loading;
