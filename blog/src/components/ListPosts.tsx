import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

// const posts = [
// { id: 1, title: "Meu primeiro post", content: "Conteúdo do primeiro post..." },
// { id: 2, title: "Meu segundo post", content: "Aqui está outro post interessante." },
// { id: 3, title: "Meu terceiro post", content: "Aprendendo React é incrível!" },
// { id: 4, title: "Dicas de JavaScript", content: "Aqui estão algumas dicas úteis para melhorar seu código JS." },
// { id: 5, title: "CSS Moderno", content: "Flexbox e Grid revolucionaram o layout no CSS." },
// { id: 6, title: "React Hooks", content: "useState e useEffect tornam o React ainda mais poderoso." },
// { id: 7, title: "Aprendendo TypeScript", content: "Tipagem forte pode prevenir muitos erros no desenvolvimento." },
// { id: 8, title: "O Poder do Node.js", content: "Node.js permite rodar JavaScript no servidor de forma eficiente." },
// { id: 9, title: "Banco de Dados SQL vs NoSQL", content: "Entenda as diferenças e escolha a melhor opção para seu projeto." },
// { id: 10, title: "Melhores Práticas em Desenvolvimento Web", content: "Organização de código e boas práticas aumentam a qualidade do projeto." }
// ];


type Props = {
    titulo: string;
    searchQuery: string;
    endpoint: string;
};

type Post = {
    id: number;
    title: string;
    content: string;
    user_id: number;
    createdBy: string;
    createdAt: string;
    updateAt: string;
}

const ListPosts = ({ titulo, searchQuery, endpoint }: Props) => {
    const [posts, setPosts] = useState([] as Post[]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const api = import.meta.env.VITE_API_URL;
                console.log('api: ', api);

                const response = await axios.get(`${api}/api/${endpoint}`, {withCredentials: true});
                const data = response.data;
                setPosts(data);
                console.log('POSTS --------------------');
                console.log("Data recebida:", data);
            } catch (error) {
                console.error("Erro ao buscar posts:", error);
            }
        }

        fetchPosts();
    }, []);

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="container mt-5 d-flex flex-column align-items-center">
            <h1>{titulo}</h1>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => <Post key={post.id} {...post} endpoint={endpoint == 'posts/my' ? 'my' : ''} createdBy={post.createdBy} />)
                ) : (
                    <p className="text-muted">Nenhum post encontrado.</p>
                )}
            </div>
        </>
    );
};

export default ListPosts;
