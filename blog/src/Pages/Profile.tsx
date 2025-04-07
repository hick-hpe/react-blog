import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [id, setId] = useState(0);
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senhaAtual, setSenhaAtual] = useState('');
    const [senhaNova, setSenhaNova] = useState('');
    const [logado, setLogado] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const isLoogged = async () => {
            const response = await axios.get('http://localhost:5000/auth/isLogged', {
                withCredentials: true
            });
            const data = await response.data;
            setLogado(data.loggedIn);
            setId(data.user.id);
            setNome(data.user.nome);
            setEmail(data.user.email);
        };

        isLoogged();
    }, [logado]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

    const submitForm = async () => {
        if (!nome.trim() || !email.trim() || !senhaAtual.trim()) {
            toast.error('Preencha todos os campos!');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/users/${id}`,
                { nome, email, senhaAtual, senhaNova },
                { withCredentials: true }
            );
            const data = await response.data;
            toast.success(data.message);
        } catch (error) {
            console.error("Erro ao atualizar o perfil:", error);
            toast.error('Erro ao atualizar o perfil!');
            return;
        }
        toast.success('Dados atualizados com sucesso!');
    };

    const deleteAccount = async () => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/users/${id}`, { withCredentials: true });
            const data = await response.data;
            toast.success(data.message);
            setTimeout(() => {
                navigate('/')
            }, 3000);
        } catch (error) {
            console.error("Erro ao excluir conta:", error);
            toast.error('Erro ao excluir conta!');
            return;
        }
        toast.success('Conta excluída com sucesso!');
    };

    return (
        <>
            <ToastContainer position='top-right' autoClose={3000} />
            <NavBar />
            <div className="profile-container" style={{ maxWidth: '600px', margin: '20px auto', padding: '20px' }}>
                <h2>Editar Perfil</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="senha-atual">
                        <Form.Label>Senha atual</Form.Label>
                        <Form.Control
                            type="password"
                            value={senhaAtual}
                            onChange={(e) => setSenhaAtual(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="senha-nova">
                        <Form.Label>Senha nova</Form.Label>
                        <Form.Control
                            type="password"
                            value={senhaNova}
                            onChange={(e) => setSenhaNova(e.target.value)}
                        />
                    </Form.Group>

                    <Button variant="dark" type="submit" className='w-100 mt-3' onClick={submitForm}>
                        Salvar Alterações
                    </Button>
                    {/* abrir modal de exclusao e depois cso deseja confirmar */}
                    <Button variant="danger" type="submit" className='w-100 mt-2' onClick={handleShow}>
                        Excluir conta
                    </Button>
                </Form>
            </div>
            <Footer />

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Excluir conta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja excluir sua conta??
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Não
                    </Button>
                    <Button variant="danger" onClick={deleteAccount}>
                        Sim, excluir
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Profile;
