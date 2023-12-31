import "./MoviesCard.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const MoviesCard = ({
  card,
  onSaveMovie,
  onDeleteMovie,
  saveCardId,
  setErrorText,
}) => {
  const [saveCard, setSaveCard] = useState(false);
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    saveCardId.map((saveMovies) => {
      if (saveMovies.movieId === card.id) {
        setSaveCard(true);
      }
    });
  }, [saveCardId]);

  const likeButtonClassName = () => {
    let className = "";
    if (pathname === "/movies") {
      className = `${
        !saveCard ? "movies__button_dislike" : "movies__button_like"
      }`;
    }
    if (pathname === "/saved-movies") {
      className = `${
        isMobile ? "movies__button_delete" : "movies__button_delete-desctop"
      }`;
    }
    return className;
  };

  function handleLike() {
    handleLikeClick();
  }

  function handleLikeClick() {
    if (saveCard) {
      onDeleteMovie(saveCardId.filter((item) => item.movieId === card.id)[0])
        .then(() => setSaveCard(false))
        .catch((err) => {
          console.log(err);
          setErrorText("Ошибка удаления фильма");
        });
    } else {
      onSaveMovie(card)
        .then(() => setSaveCard(true))
        .catch((err) => {
          console.log(err);
          setErrorText("Ошибка сохранения фильма");
        });
    }
  }

  function handleDeleteClick() {
    onDeleteMovie(card)
      .then(() => setSaveCard(false))
      .catch((err) => console.log(err));
  }

  function displayDeleteButton(w) {
    if (w > 768) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
  }

  useEffect(() => {
    displayDeleteButton();
    const handleResize = () => {
      displayDeleteButton(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <li className="movies__item">
      <a href={card.trailerLink} target="_blank">
        <img
          className="movies__photo"
          src={
            pathname === "/saved-movies"
              ? card.image
              : `https://api.nomoreparties.co${card.image.url}`
          }
          alt={card.nameRU}
        />
      </a>
      <div className="movies__info">
        <h2 className="movies__title">{card.nameRU}</h2>
        <button
          className={likeButtonClassName()}
          type="button"
          onClick={pathname === "/movies" ? handleLike : handleDeleteClick}
        />
      </div>
      <p className="movies__duration">
        {(card.duration / 60) | 0}ч {card.duration % 60}
      </p>
    </li>
  );
};

export default MoviesCard;
