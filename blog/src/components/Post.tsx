import styled from "styled-components";

const PostStyled = styled.div`
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  max-width: 800px;
  width: 100%;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  background: #fff;

  h1 {
    font-size: 1.8rem;
    color: #333;
  }

  p {
    font-size: 1rem;
    color: #555;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    padding: 15px;
    h1 {
      font-size: 1.5rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
`;

type PostProps = {
  title: string;
  content: string;
};

const Post = ({ title, content }:PostProps) => {
  return (
    <PostStyled aria-label={`Post: ${title}`}>
      <h1>{title}</h1>
      <p>{content}</p>
    </PostStyled>
  );
};

export default Post;
