import { Profiler, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Auth from '../Auth/Auth';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Landing from '../Main/Landing/Landing';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';

const App = () => {
 const [loggedIn, setIsLoggedIn] = useState(true);
 const [valueLogin, setIsValueLogin] = useState({});
 const [valueRegister, setIsValueRegister] = useState({});
 const [isNotFoundPage, setIsNotFoundPage] = useState(false);

  return (
    <>
   {!isNotFoundPage &&  <Header loggedIn={loggedIn} /> }
      <Routes>
        <Route path='/' 
        element={<Landing />} 
        loggedIn={loggedIn} 
        />
        <Route
          path='/movies'
          element={
            <ProtectedRouteElement 
            element= {Movies}
            loggedIn={loggedIn}
            />
          }
        />
        <Route
          path='/savedmovies'
          element={
            <ProtectedRouteElement 
            element= {SavedMovies}
            loggedIn={loggedIn}
            />
          }
        />
        <Route
          path='/signup'
          element={
            loggedIn ? (
              <Navigate to='/' replace />
            ) : 
            (
              <Auth
                name='registration'
                value={valueRegister}
                setIsValue={setIsValueRegister}
              />
            )
          }
        />
        <Route
          path='/signin'
          element={
            loggedIn ? (
              <Navigate to='/movies' replace />
            ) : 
            (
              <Auth
                value={valueLogin}
                setIsValue={setIsValueLogin}
                setIsLoggedIn={setIsLoggedIn}
              />
            )
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRouteElement
            element={Profile}
            loggedIn={loggedIn}
            setIsLoggedIn={setIsLoggedIn}
            />
          }

        />
        <Route 
        path='/*'
        element={
          <NotFound 
          setIsNotFoundPage={setIsNotFoundPage}
          />
        }
        />
      </Routes>
      {!isNotFoundPage && <Footer />}
    </>
  );
};


export default App;
