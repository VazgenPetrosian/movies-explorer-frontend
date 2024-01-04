import "./Footer.css";
import Navigation from "../Navigation/Navigation";
import { Link, useLocation } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  const pathToProfile = pathname === "/profile";
  const pathToAuth = pathname === "/signup" || pathname === "/signin";

  return (
    !pathToProfile &&
    !pathToAuth && (
      <footer className="footer">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__container">
          <Navigation className={"footer__nav"}>
            <ul className="footer__list">
              <li className="footer__item">
                <Link
                  className="footer__link"
                  to="https://practicum.yandex.ru/"
                  target="_blank"
                >
                  Яндекс.Практикум
                </Link>
              </li>
              <li className="footer__item">
                <Link
                  className="footer__link"
                  to="https://github.com/VazgenPetrosian"
                  target="_blank"
                >
                  Github
                </Link>
              </li>
            </ul>
          </Navigation>
          <p className="footer__copuright">&copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    )
  );
};

export default Footer;
