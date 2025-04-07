import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import Post from "../components/Post";
import Footer from "../components/Footer";

type PostProps = {
    title: string;
    content: string;
};

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState<PostProps>({ title: "", content: "" });

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
                const data = response.data;
                setPost({ title: data.title, content: data.content });
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
            <div className="d-flex justify-content-center w-100 mt-3">
                <div className="w-50">
                    {id && <Post id={parseInt(id, 10)} title={post.title} content={post.content} endpoint='' />}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PostDetail;