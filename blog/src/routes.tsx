import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import WritePost from "./Pages/WritePost";
import NotFound from "./Pages/NotFound";
import Register from "./Pages/Register";
import Logout from "./Pages/Logout";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Privacy from "./Pages/Privacy";
import PostDetail from "./Pages/PostDetail";
import MyPosts from "./Pages/MyPosts";
import MyPostDetail from "./Pages/MyPostDetail";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/my-posts/" element={<MyPosts />} />
        <Route path="/my-posts/:id" element={<MyPostDetail />} />
        <Route path="/write-post" element={<WritePost />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} /> {/* Página 404 */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
