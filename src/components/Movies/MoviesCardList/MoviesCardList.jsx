import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = ({
  saved, moviesData, onClickAddMore
}) => {
  return (
  <section className='movies'>
    <ul className='movies__card-list'>
      {moviesData.map((movie) => (
        <MoviesCard
          movie={movie}
          key={movie.movieId}
          saved={saved}
        />
      ))}
    </ul>
    <div className='movies__wrapper'>
      {!saved && (
        <button className='movies__button-more' onClick={onClickAddMore}>
          Ещё
        </button>
      )}
    </div>
  </section>
  );
};

export default MoviesCardList;