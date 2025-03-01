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

function App() {
  const [logado, setLogado] = useState(false);
  const [admin, setAdmin] = useState(true);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    window.onload = () => {
      setLogado(true);
    };
  }, []);

  if (logado) {
    return (
      <Router>
        <Header admin={admin} setLogado={setLogado} />
        <Routes>
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
      <Login setLogado={setLogado} setAdmin={setAdmin} setUserId={setUserId} />
    );
  }
}

export default App;
