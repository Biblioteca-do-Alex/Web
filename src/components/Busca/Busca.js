import styles from "./Busca.module.css";
import lupa from "../../assets/pesquisa.svg";

function Busca(props) {
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="text"
        name=""
        id=""
        placeholder="Pesquisar"
        value={props.busca}
        onChange={(e) => {
          props.setBusca(e.target.value);
        }}
      />
      <img className={styles.lupa} src={lupa} alt="" />
    </div>
  );
}

export default Busca;
