import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples de campos
    if (!email || !password) {
      toast.error("Preencha todos os campos!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { email, senha: password },
        { withCredentials: true }
      );

      // Se não houve erro, o login foi bem-sucedido
      toast.success(response.data.message);

      // Redireciona após 2 segundos
      setTimeout(() => navigate("/"), 2000);

    } catch (error: any) {
      // Erro no login: mostra mensagem retornada ou erro padrão
      const errorMsg = error.response?.data?.error || "Erro ao tentar fazer login. Tente novamente mais tarde.";
      console.error("Erro ao fazer login:", error);
      toast.error(errorMsg);
    }

  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card p-4 shadow-lg" style={{ width: "22rem" }}>
        <h3 className="d-flex justify-content-between mb-4">
          <button className="btn btn-light" onClick={() => navigate("/")}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <span>Login</span>
          <span></span>
        </h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Entrar
          </button>
        </form>
        <div className="text-center mt-3">
          <Link to="#recuperar-senha">Esqueceu a senha?</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
