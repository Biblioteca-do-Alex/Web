import styles from "./StatusLivro.module.css";

function StatusLivro(props) {
    
  return (<>
  <span>{props.status}</span>
  <p>{props.mensagem}</p>
  </>);
}

export default StatusLivro;
