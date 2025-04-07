import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect } from "react";

const Privacy = () => {
    useEffect(() => {
        document.title = "Política de Privacidade - Meu Site";
    }, []);

    return (
        <>
            <NavBar />
            <div className="container mt-5" style={{ maxWidth: "800px", margin: "auto" }}>
                <h1 className="mb-4 text-center">Política de Privacidade</h1>

                <section className="mb-5">
                    <h3>1. Informações Coletadas</h3>
                    <p>
                        Coleta das seguintes informações <strong>nome e e-mail</strong>, quando você se cadastra em nossa plataforma.
                    </p>
                </section>

                <section className="mb-5">
                    <h3>2. Como Usamos Seus Dados</h3>
                    <p>
                        Apenas para esta plataforma!
                    </p>
                </section>

                <section className="mb-5">
                    <h3>3. Seus Direitos</h3>
                    <p>
                        Você pode <strong>solicitar a exclusão ou modificação</strong> dos seus dados a qualquer momento.
                        Basta entrar em contato pelo e-mail.
                    </p>
                </section>

                <section className="mb-5">
                    <h3>4. Segurança</h3>
                    <p>
                        São utilizadas criptografias e práticas recomendadas de desenvolvimento para proteger seus dados contra acessos não autorizados, perda ou vazamentos.
                    </p>
                </section>

                <section className="mb-5">
                    <h3>5. Contato</h3>
                    <p>
                        Se tiver dúvidas sobre a política, entre em contato pelo e-mail:  
                        <a href="mailto:palermohpe@gmail.com" className="text-decoration-none"> palermohpe@gmail.com</a>
                    </p>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default Privacy;
