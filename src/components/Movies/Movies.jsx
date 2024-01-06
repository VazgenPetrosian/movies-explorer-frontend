import { useState, useEffect } from "react";
import "./Movies.css";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";
import Main from "../Main/Main";
import Preloader from "../Movies/Preloader/Preloader";

const Movies = ({
  onSaveMovie,
  onDeleteMovie,
  saveCard,
  isLoading,
  initialCards,
  errorText,
  error,
  setErrorText,
  shortFilms,
  setError,
  getInitialMovies,
  isFirstSearch,
}) => {
  const [filterFilms, setFilterFilms] = useState(
    JSON.parse(localStorage.getItem("filteredFilms")) || []
  );
  const [filterShortFilms, setFilterShortFilms] = useState(
    JSON.parse(localStorage.getItem("filteredShortFilms")) || []
  );
  const [isShortFilms, setIsShortFilms] = useState(
    localStorage.getItem("checkbox") === "true" ? true : false
  );

  function handleShortFilms() {
    setIsShortFilms(!isShortFilms);
  }



  function  handleSearchFilms(v) {
    if (isFirstSearch === true) {
      function doTheFirstSearch (starterPackFilms) {
      const localFilterFilms = starterPackFilms[0].filter((card) => {
        return (
          card.nameRU.toLowerCase().includes(v.toLowerCase()) ||
          card.nameEN.toLowerCase().includes(v.toLowerCase())
        );
      });
      const localFilterShortFilms = starterPackFilms[1].filter((card) => {
        return (
          card.nameRU.toLowerCase().includes(v.toLowerCase()) ||
          card.nameEN.toLowerCase().includes(v.toLowerCase())
        );
      });
      setFilterFilms(localFilterFilms);
      setFilterShortFilms(localFilterShortFilms);
      localStorage.setItem("filteredFilms", JSON.stringify(localFilterFilms));
      localStorage.setItem(
        "filteredShortFilms",
        JSON.stringify(localFilterShortFilms)
      );
  
      if (localFilterFilms.length === 0) {
        setError(true);
        setErrorText("Ничего не найдено");
      } else if (v.toLowerCase().length === 0) {
        setError(true);
        setErrorText("Нужно ввести ключевое слово");
      } else {
        setError(false);
      }}

      getInitialMovies(isFirstSearch, doTheFirstSearch);
    }
     else {
      const localFilterFilms = initialCards.filter((card) => {
        return (
          card.nameRU.toLowerCase().includes(v.toLowerCase()) ||
          card.nameEN.toLowerCase().includes(v.toLowerCase())
        );
      });
      const localFilterShortFilms = shortFilms.filter((card) => {
        return (
          card.nameRU.toLowerCase().includes(v.toLowerCase()) ||
          card.nameEN.toLowerCase().includes(v.toLowerCase())
        );
      });
      setFilterFilms(localFilterFilms);
      setFilterShortFilms(localFilterShortFilms);
      localStorage.setItem("filteredFilms", JSON.stringify(localFilterFilms));
      localStorage.setItem(
        "filteredShortFilms",
        JSON.stringify(localFilterShortFilms)
      );
  
      if (localFilterFilms.length === 0) {
        setError(true);
        setErrorText("Ничего не найдено");
      } else if (v.toLowerCase().length === 0) {
        setError(true);
        setErrorText("Нужно ввести ключевое слово");
      } else {
        setError(false);
      }
    }
  }

  useEffect(() => {
    if (isShortFilms) {
      if (filterShortFilms.length === 0) {
        setError(true);
        setErrorText("Ничего не найдено");
      } else {
        setError(false);
      }
    }
  }, [filterShortFilms]);

  useEffect(() => {
    setErrorText("");
    setFilterFilms(JSON.parse(localStorage.getItem("filteredFilms")));
    setFilterShortFilms(JSON.parse(localStorage.getItem("filteredShortFilms")));
  }, [isShortFilms]);

  return (
    <Main className="main_movies">
      <SearchForm
        setSearchQuery={handleSearchFilms}
        isShortFilms={isShortFilms}
        setIsShortFilms={handleShortFilms}
        errorText={errorText}
        error={error}
      />
      {error ? <span className="search__error">{errorText}</span> : ""}
      {isLoading && <Preloader />}
      {!isLoading && <MoviesCardList
        saved={false}
        moviesData={isShortFilms ? filterShortFilms : filterFilms}
        onSaveMovie={onSaveMovie}
        onDeleteMovie={onDeleteMovie}
        saveCard={saveCard}
        isLoading={isLoading}
        setErrorText={setErrorText}
      />}
    </Main>
  );
};

export default Movies;
