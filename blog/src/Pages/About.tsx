import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const About = () => {
    return (
        <>
            <NavBar />
            <div className="container mt-5">
                <h1 className="mb-4">Sobre Nós</h1>
                
                <section className="mb-5">
                    <h3>Nossa Missão</h3>
                    <p>
                        Nossa missão é fornecer conteúdos de qualidade e ajudar pessoas a expandirem seu conhecimento.
                        Criamos um espaço onde o aprendizado é acessível, interativo e eficiente.
                    </p>
                </section>

                <section className="mb-5">
                    <h3>Visão e Valores</h3>
                    <ul>
                        <li><strong>Inovação:</strong> Estamos sempre buscando novas maneiras de melhorar a experiência dos nossos usuários.</li>
                        <li><strong>Transparência:</strong> Prezamos pela clareza e honestidade em tudo que fazemos.</li>
                        <li><strong>Qualidade:</strong> Nos comprometemos a oferecer apenas o melhor conteúdo.</li>
                    </ul>
                </section>

                <section className="mb-5">
                    <h3>Nossa Equipe</h3>
                    <p>
                        Contamos com uma equipe de especialistas apaixonados por tecnologia, educação e inovação.
                    </p>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card text-center p-3">
                                <h5>Lucas Silva</h5>
                                <p>Fundador & CEO</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center p-3">
                                <h5>Ana Souza</h5>
                                <p>Diretora de Conteúdo</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center p-3">
                                <h5>João Pedro</h5>
                                <p>Desenvolvedor Chefe</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};

export default About;
