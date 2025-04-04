import styled from "styled-components";

const FooterWrapper = styled.footer`
  background: #222;
  color: #fff;
  padding: 20px 0;
  text-align: center;

  p {
    margin: 0;
    font-size: 14px;
  }

  a {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Meu Blog. Todos os direitos reservados.</p>
        <p>
          <a href="/about">Sobre</a> | <a href="/contact">Contato</a> | <a href="/privacy">Privacidade</a>
        </p>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
