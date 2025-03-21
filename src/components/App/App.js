import styles from "./App.module.css";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Catalogo from "../../pages/Catalogo/Catalogo";
import Emprestimos from "../../pages/Emprestimos/Emprestimos";
import Livros from "../../pages/Cadastros/Livros/Livros";
import Exemplares from "../../pages/Cadastros/Exemplares/Exemplares";
import Login from "../../pages/Login/Login";
import DetalheLivro from "../../pages/DetalheLivro/DetalheLivro";
import Usuario from "../../pages/Cadastros/Usuario/Usuario";
import { Navigate } from "react-router-dom";

function App() {
  const [tituloPagina, setTituloPagina] = useState("Biblioteca do Alex");
  const [logado, setLogado] = useState(true);
  const [admin, setAdmin] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    document.getElementById("tituloPagina").textContent = tituloPagina;
  }, [tituloPagina]);

  if (logado) {
    return (
      <Router>
        <Header admin={admin} setLogado={setLogado} />
        <Routes>
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="/cadastros/usuario" element={<Navigate to="/" replace />} />
          <Route path="/" admin={admin} element={<Catalogo />} />
          <Route path="/emprestimos" element={<Emprestimos />} />
          <Route path="/cadastros/livros" element={<Livros />} />
          <Route path="/cadastros/exemplares" element={<Exemplares />} />
          <Route path="/livro/:id" element={<DetalheLivro />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/login"
            element={
              <Login
                setLogado={setLogado}
                admin={admin}
                setAdmin={setAdmin}
                setUserId={setUserId}
                setTituloPagina={setTituloPagina}
              />
            }
          />

          <Route path="/cadastros/usuario" element={<Usuario />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
