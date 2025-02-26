import styles from "./App.module.css";
import Header from "../Header/Header";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Livros from "../../pages/Livros/Livros";
import Emprestimos from "../../pages/Emprestimos/Emprestimos";
import Cadastros from "../../pages/Cadastros/Cadastros";
import Login from "../../pages/Login/Login";

function App() {
  const [logado, setLogado] = useState(true);
  const [admin, setAdmin] = useState(false);
  if (logado) {
    return (
      <Router>
        <Header admin={admin}/>
        <Routes>
          <Route path="/" admin={admin} element={<Livros />} />
          <Route path="/emprestimos" element={<Emprestimos />} />
          <Route path="/cadastros" element={<Cadastros />} />
        </Routes>
      </Router>
    );
  } else {
    return <Login setLogado={setLogado} setAdmin={setAdmin} />;
  }
}

export default App;
