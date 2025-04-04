import { useState } from 'react';
import NavBar from '../components/NavBar';
import ListPosts from '../components/ListPosts';
import Footer from '../components/Footer';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Estado da pesquisa

  return (
    <>
      <NavBar setSearchQuery={setSearchQuery} />
      <ListPosts searchQuery={searchQuery} />
      <Footer />
    </>
  );
};

export default Home;
