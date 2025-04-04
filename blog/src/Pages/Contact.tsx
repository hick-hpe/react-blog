import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Contact = () => {
    return (
        <>
            <NavBar />
            <div className="container mt-5" style={{ minHeight: "calc(100vh - 186px)", maxWidth: "500px" }}>
                <h1>Contato</h1>
                <p>Tem alguma dúvida ou sugestão? Entre em contato conosco!</p>
                <form>
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
            </div>
            <Footer />
        </>
    );
};

export default Contact;
