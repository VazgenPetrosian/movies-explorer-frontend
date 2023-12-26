import './MoviesCard.css';
import { useState } from 'react';

const MoviesCard = ({
  saved,
  movie,
}) => {
  const [ isLiked, setIsLiked ] = useState(false);
  const likeButtonClassName = `${!isLiked ? 'movies__button_dislike' : 'movies__button_like'}`;

  function handleLike() {
    setIsLiked(!isLiked);
  }

  return (
    <li className='movies__item'>
      <img
        className='movies__photo'
        src={movie.image}
        alt={movie.nameRU}
        onClick={handleLike}
      />
      <div className='movies__info'>
      <h2 className='movies__title'>{movie.nameRU}</h2>
      <button
          className={likeButtonClassName}
          type='button'
          onClick={handleLike}
        />
      </div>
      <p className='movies__duration'>
          {(movie.duration / 60) | 0}ч {movie.duration % 60}м
        </p>
    </li>
  );
};

export default MoviesCard;