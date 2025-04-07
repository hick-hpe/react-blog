import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import Footer from "../components/Footer";

type PostProps = {
    title: string;
    content: string;
    createdBy: string;
};

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState({} as PostProps);
    const api = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${api}/api/posts/${id}`);
                const data = response.data;
                setPost({ title: data.title, content: data.content, createdBy: data.createdBy });
                console.log("Data recebida:", data);
            } catch (error) {
                console.error("Erro ao buscar o post:", error);
            }
        };

        if (id) fetchPost();
    }, [id]);


    useEffect(() => {
        console.log("Post atualizado:", post);
    }, [post]);

    return (
        <>
            <NavBar />
            <Link to="/" className="nav-link text-dark mt-3 ms-3">
                <i className="bi bi-arrow-left"></i> Voltar para a lista de posts
            </Link>
            <div className="mt-3">
                <div className="d-flex justify-content-center w-100">
                    {id && <Post id={parseInt(id, 10)} title={post.title} content={post.content} endpoint='' createdBy={post.createdBy} />}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PostDetail;