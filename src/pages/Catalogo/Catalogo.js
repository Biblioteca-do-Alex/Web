import styles from "./Catalogo.module.css";

import { useState, useEffect } from "react";
import GrupoGenero from "../../components/GrupoGenero/GrupoGenero";

function Catalogo() {
  const [generos, setGeneros] = useState(["Romance", "Fantasia"]);
  const [catalogo, setCatalogo] = useState([]);

  useEffect(() => {
    const livro = [
      {
        id: "1234",
        nome: "A Hipótese do Amor",
        autor: "Ali Hazelwood",
        genero: "Romance",
        foto: "https://m.media-amazon.com/images/I/71dsFCsDGYL._UF894,1000_QL80_.jpg",
      },
      {
        id: "4321",
        nome: "Harry Potter",
        autor: "J.K. Rowling",                
        genero: "Fantasia",
        foto: "https://m.media-amazon.com/images/I/81ibfYk4qmL.jpg",
      },
    ];
    setCatalogo(livro);
  }, []);

  return (
    <div className={styles.container}>
      {generos.map((genero) => (
        <GrupoGenero
          genero={genero}
          livros={catalogo.filter((livro) => livro.genero == genero)}
        />
      ))}
    </div>
  );
}

export default Catalogo;
