import './NotFound.css';
import Main from '../Main/Main';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const NotFound = ({ setIsNotFoundPage }) => {
  useEffect(() => {
    setIsNotFoundPage(true);
  }, [setIsNotFoundPage]);

  return (
    <Main className='notfound'>
    <h1 className='notfound__title'>404</h1>
    <p className='notfound__subtitle'>Страница не найдена</p>
    <Link
      className='notfound__link'
      to='/'
      onClick={() => setIsNotFoundPage(false)}
    >
      Назад
    </Link>
  </Main>
  )
}

export default NotFound;