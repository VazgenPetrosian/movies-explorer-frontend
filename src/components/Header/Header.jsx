import './Header.css';
import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.svg';


const Header = ({ loggedIn }) => {
  const [menuIsActive, setIsMenuActive] = useState(false);
  const { pathname } = useLocation();
  const pathAuth = pathname === '/signup' || pathname === '/signin';

  
  const classNameHeader = () => {
    let className = 'header';
    if (menuIsActive) {
      className = `${className} header_active`;
    }
    if (loggedIn) {
      className = `${className} header_login`;
    }
    if (pathname === '/') {
      className = `${className} header_hide`;
    }
    if (pathAuth) {
      className = `${className} header_auth`;
    }
    return className;
  };
  
  const classNameHeaderLink = () => {
    let className = 'header__link';
    if (pathname === '/') {
      className = `${className} header__link_backLogoAll`;
    }
    if (pathname === '/movies' || pathname === '/savedmovies' || pathname === '/profile') {
      className = `${className} header__link_backLogoMovies`;
    }
    if (menuIsActive) {
      className = `${className} header__link_isMenu`
    }
    return className;
  };

  function handleMenuClick() {
    setIsMenuActive(true);
  }

  function handleCloseClick() {
    setIsMenuActive(false);
  }

return (
  <header className={classNameHeader()}>
    <Link className='header__link header__link_logo' to='/'>
      <img className='header__logo' src={logo} alt='Movies'/>
    </Link>
      {!pathAuth &&
        (!loggedIn ? (
        <Navigation>
          <Link className='header__link' to='/signup'>
            Регистрация
          </Link>
          <Link className='header__button' to='/signin'>
            Войти
          </Link>
        </Navigation>
      ) : (
        <>
          <div className='header__wrapper'>
            <Navigation>
              <ul className='header__list'>
                <li className='header__item'>
                  <NavLink className='header__link' to='/'>
                    Главная
                   </NavLink>
                </li>
                <li className='header__item'>
                  <NavLink className='header__link' to='/movies'>
                    Фильмы
                   </NavLink>
                </li>
                <li className='header__item'>
                  <NavLink className='header__link' to='/savedmovies'>
                     Сохранённые фильмы
                  </NavLink>
                </li>
              </ul>
            </Navigation>
            <Navigation>
              <NavLink
                className={classNameHeaderLink()}
                to='/profile'
              >
                Аккаунт
              </NavLink>
            </Navigation>
            <button
              className='header__button-close'
              type='button'
              aria-label='CloseMenu'
              onClick={handleCloseClick}
          />
          </div>
          <button
            className='header__button-menu'
            type='button'
            aria-label='OpenMenu'
            onClick={handleMenuClick}
          />
        </>
      ))}
  </header>
);
};

export default Header;