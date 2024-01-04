import { useEffect, useState } from "react";
import { Navigate, useNavigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "../Auth/Auth";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Popup from "../Popup/Popup";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Landing from "../Main/Landing/Landing";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";

import * as auth from "../../utils/auth";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";

import okImage from "../../images/ok.png";
import notOkImage from "../../images/notok.png";
const App = () => {
  const [loggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("jwtToken") || false
  );
  const [valueLogin, setIsValueLogin] = useState({});
  const [valueRegister, setIsValueRegister] = useState({});
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [popupAnswer, setPopupAnswer] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupImage, setPopupImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [initialCards, setInitialCards] = useState([]);
  const [saveCard, setSaveCard] = useState([]);
  const [shortFilms, setShortFilms] = useState([]);

  const navigate = useNavigate();

  function onLogin(loginPayload) {
    setIsLoading(true);
    auth
      .apiLogin(loginPayload ? loginPayload : valueLogin)
      .then((res) => {
        localStorage.setItem("jwtToken", res.jwtToken);
        setCurrentUser({
          name: res.name,
          email: res.email,
        });
        setIsLoggedIn(true);
        setPopupImage(okImage);
        setPopupAnswer("Молодец!");
        handleInfoTooltip();
        navigate("/movies");
      })
      .catch(() => {
        setPopupImage(notOkImage);
        setPopupAnswer("Успешная Ошибка!");
        handleInfoTooltip();
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleInfoTooltip() {
    setIsPopupOpen(true);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    mainApi
      .changeUserInfo(data)
      .then((res) => {
        setCurrentUser(res.data);
        setPopupImage(okImage);
        setPopupAnswer("Апдейт!");
        handleInfoTooltip();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSaveMovie(data) {
    return mainApi.addMovies(data).then((newCard) => {
      setSaveCard([newCard, ...saveCard]);
      localStorage.setItem(
        "saved-movies",
        JSON.stringify([newCard, ...saveCard])
      );
    });
  }

  function handleDeleteMovie(filmDelete) {
    return mainApi.removeMovies(filmDelete._id).then((res) => {
      const saveCardArray = saveCard.filter((card) => {
        return card._id !== filmDelete._id;
      });
      setSaveCard(
        saveCard.filter((card) => {
          return card._id !== filmDelete._id;
        })
      );

      localStorage.setItem("saved-movies", JSON.stringify(saveCardArray));
    });
  }

  function onSignout() {
    setIsLoggedIn(false);
    setCurrentUser({});
    setInitialCards([]);
    setErrorText("");
    localStorage.clear();
    navigate("/");
  }

  function closeAllPopups() {
    setIsPopupOpen(false);
  }

  function onRegister() {
    setIsLoading(true);
    auth
      .apiRegister(valueRegister)
      .then(() => {
        setPopupImage(okImage);
        setPopupAnswer("Успешный рег!");
        handleInfoTooltip();
        onLogin(valueRegister);
      })
      .catch(() => {
        setPopupImage(notOkImage);
        setPopupAnswer("Успешная Ошибка!");
        handleInfoTooltip();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      auth
        .checkToken(jwtToken)
        .then((res) => {
          if (res) {
            setIsLoggedIn(true);
            setCurrentUser({
              name: res.name,
              email: res.email,
            });
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  useEffect(() => {
    if (loggedIn === true && localStorage.getItem("jwtToken")) {
      setIsLoading(true);
      mainApi
        .getUserInfo()
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    return;
  }, [loggedIn, localStorage.getItem("jwtToken")]);

  useEffect(() => {
    if (loggedIn === true) {
      setIsLoading(true);
      moviesApi
        .getInitialMovies()
        .then((cards) => {
          setInitialCards(cards);
          const startFilterCards = cards.filter((film) => film.duration <= 40);
          localStorage.setItem("shortFilms", JSON.stringify(startFilterCards));
          localStorage.setItem("longFilms", JSON.stringify(cards));
          localStorage.setItem(
            "filteredShortFilms",
            JSON.stringify(startFilterCards)
          );
          setShortFilms(startFilterCards);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    return;
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn === true && localStorage.getItem("jwtToken")) {
      setIsLoading(true);
      mainApi
        .getMovies()
        .then((card) => {
          setIsLoggedIn(true);
          setSaveCard(card);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    return;
  }, [loggedIn, localStorage.getItem("jwtToken")]);

  return (
    <>
      {!isNotFoundPage && <Header loggedIn={loggedIn} />}
      <Routes>
        <Route path="/" element={<Landing />} loggedIn={loggedIn} />
        <Route
          path="/movies"
          element={
            <ProtectedRouteElement
              element={Movies}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
              saveCard={saveCard}
              isLoading={isLoading}
              initialCards={initialCards}
              errorText={errorText}
              error={error}
              setError={setError}
              setErrorText={setErrorText}
              shortFilms={shortFilms}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRouteElement
              element={SavedMovies}
              saveCard={saveCard}
              onDeleteMovie={handleDeleteMovie}
              errorText={errorText}
              error={error}
              setError={setError}
              setErrorText={setErrorText}
              loggedIn={loggedIn}
            />
          }
        />
        <Route
          path="/signup"
          element={
            loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Auth
                name="registration"
                value={valueRegister}
                setIsValue={setIsValueRegister}
                onLogin={onLogin}
                onRegister={onRegister}
              />
            )
          }
        />
        <Route
          path="/signin"
          element={
            loggedIn ? (
              <Navigate to="/movies" replace />
            ) : (
              <Auth
                value={valueLogin}
                setIsValue={setIsValueLogin}
                setIsLoggedIn={setIsLoggedIn}
                onLogin={onLogin}
                onRegister={onRegister}
              />
            )
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement
              element={Profile}
              loggedIn={loggedIn}
              setIsLoggedIn={setIsLoggedIn}
              onUpdateUser={handleUpdateUser}
              onSignOut={onSignout}
              currentUser={currentUser}
              onSubmit={handleUpdateUser}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/*"
          element={<NotFound setIsNotFoundPage={setIsNotFoundPage} />}
        />
      </Routes>
      {!isNotFoundPage && <Footer />}
      <Popup
        title={popupAnswer}
        image={popupImage}
        isOpen={isPopupOpen}
        onClose={closeAllPopups}
      />
    </>
  );
};

export default App;
