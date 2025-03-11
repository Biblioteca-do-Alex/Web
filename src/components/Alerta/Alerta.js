import { useState, useEffect } from "react";
import styles from "./Alerts.module.css";
import fechar from "../../assets/fechar.svg";

function Alerta({ alerta }) {
  const [titulo, setTitulo] = useState("");
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (alerta) {
      if (alerta.tipo === "error") {
        setTitulo("Erro");
      } else if (alerta.tipo === "success") {
        setTitulo("Sucesso");
      } else {
        setTitulo("Atenção");
      }

      setVisivel(true);

      let timer;
      if (alerta.tempo != null) {
        timer = setTimeout(() => {
          setVisivel(false);
        }, alerta.tempo);
      } else {
        timer = setTimeout(() => {
          setVisivel(false);
        }, 3000);
      }
      return () => clearTimeout(timer);
    }
  }, [alerta]);

  if (!visivel) {
    return null;
  }

  return (
    <>
      <div
        className={`${styles.container} ${
          alerta.tipo === "error"
            ? styles.error
            : alerta.tipo === "success"
            ? styles.success
            : styles.warning
        }${!visivel ? styles.invisivel : ""}`}
      >
        <div className={styles.coluna1}>
          <h3 className={styles.titulo}>{titulo}</h3>
          <p className={styles.mensagem}>{alerta.mensagem}</p>
        </div>
        <div className={styles.coluna2}>
          <img
            className={styles.fechar}
            src={fechar}
            onClick={() => {
              setVisivel(false);
            }}
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Alerta;
