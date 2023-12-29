import { useState } from 'react';
import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import { movieList } from '../../utils/movieList.js';
import Main from '../Main/Main';

const Movies = () => {
  const [allMovies, setAllMovies] = useState(9);

  function handleAddMore() {
    setAllMovies(() => allMovies + 3);
  }

  return (
    <Main className='main_movies'>
      <SearchForm />

      <MoviesCardList
        saved={false}
        moviesData={movieList.slice(0, allMovies)}
        onClickMore={handleAddMore}
      />
    </Main>
  );
};

export default Movies;