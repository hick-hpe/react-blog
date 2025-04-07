import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";

const Contact = () => {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast.success("Formulário enviado! (Funcionalidade não implementada)");
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} draggable theme="light" />
            <NavBar />
            <div className="container mt-5" style={{ minHeight: "calc(100vh - 186px)", maxWidth: "500px" }}>
                <h1>Contato</h1>
                <p>Tem alguma dúvida ou sugestão? Entre em contato conosco!</p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Seu Nome</label>
                        <input id="name" type="text" className="form-control" placeholder="Digite seu nome" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Seu Email</label>
                        <input id="email" type="email" className="form-control" placeholder="Digite seu email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Mensagem</label>
                        <textarea id="message" className="form-control" rows={4} placeholder="Digite sua mensagem" required
                        style={{resize: "none"}} />
                    </div>
                    <button type="submit" className="btn btn-dark">Enviar</button>
                </form>
            <div className="text-danger">
                <p className="alert alert-warning mt-3">A funcionalidade de envio de email não está implementada nesta versão.</p>
                <p className="alert alert-warning">O envio de email será implementado em uma versão futura.</p>
            </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
