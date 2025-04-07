import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const About = () => {
    return (
        <>
            <NavBar />
            <div className="container mt-5">
                <h1 className="mb-4">Sobre Nós</h1>

                <section className="mb-5">
                    <h3>Olá! 👋</h3>
                </section>

                <section className="mb-5">
                    <p>Ainda se encontra em melhorias!</p>
                    <p>
                        Este blog está em fase de desenvolvimento e foi criado por mim como um projeto pessoal de testes e aprendizado. Estou utilizando essa plataforma para praticar e aplicar conhecimentos em desenvolvimento web, explorando tecnologias como React, Node.js, Express e SQLite.
                    </p>
                    <p>
                        Todas as funcionalidades e conteúdos aqui presentes são parte de uma jornada de estudo, e o objetivo principal é construir algo funcional enquanto aprendo na prática.

                        Agradeço por estar aqui! Em breve, pretendo lançar uma versão mais completa e refinada. Enquanto isso, sinta-se à vontade para explorar e acompanhar essa evolução. 🚀
                    </p>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default About;
