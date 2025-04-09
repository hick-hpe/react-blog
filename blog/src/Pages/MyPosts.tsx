import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ListPosts from '../components/ListPosts';
import Footer from '../components/Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyPosts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const isLoogged = async () => {
      const response = await axios.get(`${api}/auth/isLogged`, {
        withCredentials: true
      });
      const data = await response.data;

      console.log('Page "MyPosts"');
      console.log('api', api);
      console.log('logado', data.loggedIn);

      if (!data.loggedIn) {
        console.log('não logado');
        toast.error("Você precisa estar logado para criar um post!");
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    isLoogged();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <NavBar setSearchQuery={setSearchQuery} />
      <ListPosts titulo='Meus posts' searchQuery={searchQuery} endpoint='posts/my' />
      <Footer />
    </>
  );
};

export default MyPosts;
