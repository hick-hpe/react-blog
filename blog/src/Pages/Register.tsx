import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      toast.error("Todos os campos são obrigatórios.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Por favor, insira um email válido.");
      return;
    }

    if (password.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      const response = await axios.post(
        "${api}/auth/register",
        { nome:name, email, senha: password },
        { withCredentials: true }
      );

      // Se não houve erro, o login foi bem-sucedido
      toast.success(response.data.message);

      // Redireciona após 2 segundos
      setTimeout(() => navigate("/"), 2000);

    } catch (error: any) {
      // Erro no login: mostra mensagem retornada ou erro padrão
      const errorMsg = error.response?.data?.error || "Erro ao tentar fazer cadastro. Tente novamente mais tarde.";
      console.error("Erro ao fazer cadastro:", error);
      toast.error(errorMsg);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="card p-4 shadow-lg" style={{ width: "22rem" }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <button className="btn btn-light" onClick={() => navigate("/")}>
            <i className="bi bi-arrow-left"></i>
          </button>
          <h3 className="m-0">Registro</h3>
          <span></span>
        </div>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Mín. 6 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-dark w-100">
            Cadastrar
          </button>
        </form>
        
        <div className="text-center mt-3">
          <span>Já tem uma conta? </span>
          <Link to="/login" className="text-decoration-none">Faça login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
