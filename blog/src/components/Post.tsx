import { Link } from "react-router-dom";
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
    width: 300px;
  }
`;

type PostProps = {
  id: number
  title: string,
  content: string,
  endpoint: string,
  createdBy?: string
  createdAt?: string,
  updateAt?: string
}

const Post = ({ id, title, content, endpoint, createdBy, createdAt, updatedAt }: PostProps) => {
  const formatarDataIso = (iso: string): string => {
    const data = new Date(iso);
    return `em ${data.toLocaleDateString("pt-BR")}, às ${data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    })}`;
  }

  console.log('createdAt:', createdAt);
  console.log('updateAt:', updatedAt);

  return (
    <PostStyled aria-label={`Post: ${title}`}>
      <h1>
        <Link to={endpoint == 'my' ? `/my-posts/${id}` : `/posts/${id}`} style={{ textDecoration: "none", color: "#333" }}>
          {title}
        </Link>
      </h1>
      <p>{content}</p>
      <small>Por {createdBy}</small> <br />
      {createdAt && <small>Criado {formatarDataIso(createdAt)} <br /></small>}
      {updatedAt && <small>Atualizado {formatarDataIso(updatedAt)}</small>}
    </PostStyled>
  );
};

export default Post;
