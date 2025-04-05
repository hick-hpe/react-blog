import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

type Props = {
    setSearchQuery?: (query: string) => void;
};

const NavBar = ({ setSearchQuery }: Props) => {
    const navigate = useNavigate();
    const [logado, setLogado] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const isLoogged = async () => {
            const response = await axios.get('http://localhost:5000/api/isLogged', {
                withCredentials: true
              });
            const data = await response.data;
            setLogado(data.loggedIn);
            setUser(data.user);
        };

        isLoogged();
    }, [logado]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">MyBlog</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
                            <Link to='/' className="nav-link">
                                <i className="bi bi-newspaper"></i> Feed
                            </Link>
                        </li>
                        <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
                            <Link to='/write-post' className="nav-link">
                                <i className="bi bi-pencil-square"></i> Escrever
                            </Link>
                        </li>
                        <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
                            <Link to='/my-posts' className="nav-link">
                            <   i className="bi bi-newspaper"></i> Meus posts
                            </Link>
                        </li>
                        <li className="nav-item" style={{display: 'flex', alignItems: 'center'}}>
                            <Link to='/my-posts' className="nav-link">
                                <i className="bi bi-bell"></i>
                            </Link>
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
                                {user.nome}
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

