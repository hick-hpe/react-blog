import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      toast.error("Você precisa estar logado para criar um post!");
      setTimeout(() => navigate("/login"), 3000);
    } else {
      toast.success("Você está na página de criação de post!");
    }
  }, []);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("Preencha todos os campos!");
      return;
    }

    toast.success("Post criado com sucesso!");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div>
      <NavBar />
      {/* ToastContainer precisa estar aqui */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="d-flex justify-content-center align-items-center bg-light" style={{ minHeight: "calc(100vh - 178px)" }}>
        <div className="card p-4 shadow-lg" style={{ width: "30rem" }}>
          <h3 className="d-flex justify-content-between mb-4">
            <i
              className="bi bi-arrow-left-short"
              onClick={() => navigate("/")}
              role="button"
              aria-label="Voltar"
              tabIndex={0}
              style={{ cursor: "pointer" }}
            ></i>
            <span>Novo Post</span>
            <span></span>
          </h3>
          <form onSubmit={handleCreatePost}>
            <div className="mb-3">
              <label className="form-label" htmlFor="title">Título</label>
              <input
                type="text"
                id="title"
                className="form-control"
                placeholder="Digite o título do post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="content">Conteúdo</label>
              <textarea
                id="content"
                className="form-control"
                placeholder="Escreva seu post..."
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                style={{ resize: "none" }}
              />
            </div>
            <button type="submit" className="btn btn-dark w-100">
              Publicar
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NewPost;
