import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import ListPosts from '../components/ListPosts';
import Footer from '../components/Footer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoogged = async () => {
      const response = await axios.get('http://localhost:5000/api/isLogged', {
        withCredentials: true
      });
      const data = await response.data;

      console.log('logado', data.loggedIn);

      if (!data.loggedIn) {
        toast.error("Você precisa estar logado para gerenciar seus posts!");
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    isLoogged();
  }, []);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <NavBar setSearchQuery={setSearchQuery} />
      <ListPosts searchQuery={searchQuery} endpoint='my-posts' />
      <Footer />
    </>
  );
};

export default Home;
