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
      // Envia os dados para o backend
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Sucesso: login bem-sucedido
        toast.success("Login bem-sucedido!");
        
        // Armazenar informações do usuário no localStorage
        // localStorage.setItem("user", JSON.stringify({ email }));

        // Navegar para a página inicial ou outra página após o login
        // setTimeout(() => navigate("/"), 2000);
      } else {
        // Falha: credenciais inválidas
        toast.error(data.error || "Credenciais inválidas!");
      }
    } catch (error) {
      // Erro de conexão ou outro erro
      console.error("Erro ao fazer login:", error);
      toast.error("Erro ao tentar fazer login. Tente novamente mais tarde.");
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
