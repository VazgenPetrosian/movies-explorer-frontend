import "./NotFound.css";
import Main from "../Main/Main";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NotFound = ({ setIsNotFoundPage }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setIsNotFoundPage(true);
  }, [setIsNotFoundPage]);

  return (
    <Main className="notfound">
      <h1 className="notfound__title">404</h1>
      <p className="notfound__subtitle">Страница не найдена</p>
      <button
        className="notfound__link"
        to="/"
        onClick={() => {
          setIsNotFoundPage(false);
          navigate(-1);
        }}
      >
        Назад
      </button>
    </Main>
  );
};

export default NotFound;
