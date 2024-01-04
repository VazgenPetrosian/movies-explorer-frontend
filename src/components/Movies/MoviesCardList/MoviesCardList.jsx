import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MoviesCardList = ({
  saved,
  moviesData,
  onClickAddMore,
  onSaveMovie,
  onDeleteMovie,
  saveCard,
  setErrorText,
}) => {
  let location = useLocation();

  const screenWidth = useRef(window.innerWidth);

  const [isInitialDisplayOfMovies, setIsInitialDisplayOfMovies] = useState(12);
  const [addingNumberOfMovies, setAddingNumberOfMovies] = useState(0);
  const [isButtonMore, setIsButtonMore] = useState(false);

  useEffect(() => {
    displayMoviesFromWidth();
    window.addEventListener("resize", displayMoviesFromWidth);
  }, []);

  useEffect(() => {
    setIsButtonMore(moviesData?.length > isInitialDisplayOfMovies);
  }, [moviesData?.length, isInitialDisplayOfMovies]);

  function displayMoviesFromWidth() {
    if (screenWidth.current > 1099) {
      setIsInitialDisplayOfMovies(12);
      setAddingNumberOfMovies(3);
      if (moviesData.length < 12) setIsButtonMore(0);
    } else if (screenWidth.current <= 1099 && screenWidth.current > 689) {
      setIsInitialDisplayOfMovies(8);
      setAddingNumberOfMovies(2);
      if (moviesData.length < 8) setIsButtonMore(0);
    } else if (screenWidth.current <= 689 && screenWidth.current >= 320) {
      setIsInitialDisplayOfMovies(5);
      setAddingNumberOfMovies(2);
      if (moviesData.length < 5) setIsButtonMore(0);
    }
  }

  function handleMoreBtnClick() {
    const newAmountx = addingNumberOfMovies + isInitialDisplayOfMovies;
    setIsInitialDisplayOfMovies(newAmountx);
  }

  function onClickAddMore() {
    displayMoviesFromWidth();
    handleMoreBtnClick(addingNumberOfMovies);
  }

  function getMovies() {
    return moviesData
      .slice(0, isInitialDisplayOfMovies)
      .map((item) => (
        <MoviesCard
          key={item.id}
          card={item}
          onSaveMovie={onSaveMovie}
          onDeleteMovie={onDeleteMovie}
          saveCardId={saveCard}
          setErrorText={setErrorText}
          saved={saved}
        />
      ));
  }

  function getSaveMovies() {
    return moviesData.map((item) => (
      <MoviesCard
        key={item._id}
        card={item}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        saveCardId={saveCard}
        setErrorText={setErrorText}
        saved={saved}
      />
    ));
  }

  return (
    <section className="movies">
      <ul className="movies__card-list">
        {location.pathname === "/movies"
          ? moviesData && getMovies()
          : moviesData && getSaveMovies()}
      </ul>
      <div className="movies__wrapper">
        {location.pathname === "/movies" && isButtonMore ? (
          <button
            className="movies__button-more"
            type="button"
            onClick={onClickAddMore}
          >
            Ещё
          </button>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default MoviesCardList;
