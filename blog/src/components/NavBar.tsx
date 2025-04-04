import { useNavigate } from "react-router-dom";

type Props = {
    setSearchQuery?: (query: string) => void;
  };

const NavBar = ({ setSearchQuery }: Props) => {
    const navigate = useNavigate();
    const logado = localStorage.getItem('user');

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">MyBlog</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/"><i className="bi bi-newspaper"></i> Feed</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/write-post"><i className="bi bi-pencil-square"></i> Escrever</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" href="#"><i className="bi bi-bell"></i></a>
                        </li>

                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Search"
                            onInput={(e) => setSearchQuery && setSearchQuery((e.target as HTMLInputElement).value)}
                        />
                    </form>

                    {!logado ? (
                        <>
                            <button className="btn btn-primary ms-3" type="button"
                                onClick={() => navigate('/register')}>Registrar</button>
                            <button className="btn btn-primary ms-3" type="button"
                                onClick={() => navigate('/login')}>Login</button>
                        </>
                    ) : (
                        <div className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Admin
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="/logout"><i className="bi bi-box-arrow-right"></i> Sair</a></li>
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default NavBar;

