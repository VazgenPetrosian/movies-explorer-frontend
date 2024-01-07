import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const MoviesCardList = ({
  saved,
  moviesData,
  onClickAddMore,
  onSaveMovie,
  onDeleteMovie,
  saveCard,
  setErrorText,
  additiontalMovies,
  setAdditionalMovies
   
}) => {
  let location = useLocation();

  const [isInitialDisplayOfMovies, setIsInitialDisplayOfMovies] = useState(
    window.innerWidth > 1137 ? 12 : window.innerWidth > 634 ? 8 : 5
  );
  const [addingNumberOfMovies, setAddingNumberOfMovies] = useState(
    window.innerWidth > 1137 ? 3 : window.innerWidth > 634 ? 2 : 2
  );

  const [isButtonMore, setIsButtonMore] = useState(false);

  useEffect(() => {
    displayMoviesFromWidth(window.innerWidth);
    const handleResize = () => {
      displayMoviesFromWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsButtonMore(moviesData?.length > isInitialDisplayOfMovies);
  }, [moviesData?.length, isInitialDisplayOfMovies]);

  function displayMoviesFromWidth(w) {
    if (w > 1137) {
      setIsInitialDisplayOfMovies(12);
      setAddingNumberOfMovies(3);
      if (moviesData?.length < 12) setIsButtonMore(false);
    } else if (w <= 1137 && w > 634) {
      setIsInitialDisplayOfMovies(8);
      setAddingNumberOfMovies(2);
      if (moviesData?.length < 8) setIsButtonMore(false);
    } else if (w <= 634 && w >= 320) {
      setIsInitialDisplayOfMovies(5);
      setAddingNumberOfMovies(2);
      if (moviesData?.length < 5) setIsButtonMore(false);
    }
  }

  function handleMoreBtnClick() {

    setAdditionalMovies((moviesCount) => moviesCount + addingNumberOfMovies);
  }

  function onClickAddMore() {
    displayMoviesFromWidth(window.innerWidth);
    handleMoreBtnClick(addingNumberOfMovies);
  }

  function getMovies() {
    return moviesData
      .slice(0, additiontalMovies)
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
