import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

  h1 {
    font-size: 5rem;
    color: #000;
  }

  p {
    font-size: 1.5rem;
    color: #555;
    margin-bottom: 20px;
  }

  a {
    text-decoration: none;
    color: white;
    background-color: #0056b3;
    padding: 10px 20px;
    border-radius: 5px;
    transition: 0.3s;

    &:hover {
      background-color: #0056b3;
      scale: 1.05;
    }
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <h1>404</h1>
      <p>Página não encontrada</p>
      <Link to="/">Voltar para a Home</Link>
    </NotFoundContainer>
  );
};

export default NotFound;
