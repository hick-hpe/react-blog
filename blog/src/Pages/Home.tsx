import { useState } from 'react';
import NavBar from '../components/NavBar';
import ListPosts from '../components/ListPosts';
import Footer from '../components/Footer';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState(""); // Estado da pesquisa

  return (
    <>
      <NavBar setSearchQuery={setSearchQuery} />
      <ListPosts titulo='Posts' searchQuery={searchQuery} endpoint='my-posts' />
      <Footer />
    </>
  );
};

export default Home;
