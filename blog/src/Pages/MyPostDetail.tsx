import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import axios from "axios";
import {
    Button,
    Card,
    Container,
    Form,
    Modal,
    Row,
    Col
} from "react-bootstrap";

const NewPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [numChars, setNumChars] = useState(0);
    const MAX_CHARS = 600;

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deletePost = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/posts/${id}`, {
                withCredentials: true
            });
            const data = response.data;
            console.log("Post excluído:", data);

            toast.success("Post excluído com sucesso!");
            setTimeout(() => navigate("/my-posts"), 3000);
        } catch (err) {
            toast.error("Erro ao excluir o post.");
        }
    }

    useEffect(() => {
        const getMyPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/my/${id}`, {
                    withCredentials: true
                });
                const data = response.data;
                setTitle(data.title);
                setContent(data.content);
                setNumChars(data.content.length);
            } catch (err) {
                toast.error("Erro ao carregar o post");
            }
        };

        getMyPost();
    }, [id]);

    const handleEditPost = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            toast.error("Preencha todos os campos!");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/posts/${id}`,
                { title, content },
                { withCredentials: true }
            );
            const data = response.data;
            console.log("Post atualizado:", data);

            toast.success("Post atualizado com sucesso!");
            setTimeout(() => navigate(`/my-posts/${id}`), 3000);
        } catch (err) {
            toast.error("Erro ao salvar o post.");
        }
    };

    return (
        <>
            <NavBar />
            <ToastContainer position="top-right" autoClose={3000} />
            <Container fluid className="bg-light py-5" style={{ minHeight: "calc(100vh - 178px)" }}>
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6}>
                        <Card className="shadow-lg">
                            <Card.Body>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <i
                                        className="bi bi-arrow-left-short"
                                        role="button"
                                        tabIndex={0}
                                        style={{ cursor: "pointer", fontSize: "1.5rem" }}
                                        onClick={() => navigate("/")}
                                    ></i>
                                    <h4 className="m-0">Editar Post</h4>
                                    <span></span>
                                </div>

                                <Form onSubmit={handleEditPost}>
                                    <Form.Group className="mb-3" controlId="title">
                                        <Form.Label>Título</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Digite o título do post"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="content">
                                        <Form.Label>Conteúdo</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            placeholder="Escreva seu post..."
                                            rows={5}
                                            style={{ resize: "none" }}
                                            value={content}
                                            onChange={(e) => {
                                                setContent(e.target.value);
                                                setNumChars(e.target.value.length);
                                            }}
                                            maxLength={MAX_CHARS}
                                            required
                                        />
                                        <span>{numChars}/{MAX_CHARS}</span>
                                    </Form.Group>

                                    <Button variant="dark" type="submit" className="w-100 mb-2">
                                        Salvar
                                    </Button>

                                    <Button variant="danger" onClick={handleShow} className="w-100">
                                        Excluir post
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Tem certeza que deseja excluir este post?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={deletePost}>
                        Sim, excluir
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </>
    );
};

export default NewPost;
