import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const esperar3 = new Promise(() => {
        setTimeout(() => {
            navigate('/');
        }, 3000);
    });

    useEffect(() => {
        const logout = async () => {
            try {
                const response = await axios.post('${api}/auth/logout', {}, { withCredentials: true });
                const data = await response.data;
                console.log(data.message);
                setLoading(false);

                await esperar3;

            } catch (error) {
                console.error("Erro ao fazer logout:", error);
            }
        };
        logout();
    }, []);

    return (
        <>
            {
                loading
                    ? <h1>Fazendo logout...</h1>
                    : <h1>Logout realizado com sucesso! Você será redirecionado para a página inicial em 3 segundos.</h1>
            }
        </>
    );
};

export default Logout;
