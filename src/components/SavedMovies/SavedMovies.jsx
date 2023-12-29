import Main from '../Main/Main';
import { movieList } from '../../utils/movieList.js';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';

const SavedMovies = () => {
  return (
    <Main className='main_movies'>
      <SearchForm />
      <MoviesCardList saved={true} moviesData={movieList.slice(0, 12)} />
    </Main>
  );
};

export default SavedMovies;
