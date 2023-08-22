import { useState, useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from "../../context/CurrentUserContext.js";
import { SavedMoviesContextProvider } from '../../context/SavedMovieContextProvider';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Header from "../Header/Header.js";
import Main from "../Main/Main.js"
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js'
import NotFound from '../404/404.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import api from '../../utils/MainApi.js';
import InfoTooltip from "../InfoToolTip/InfoToolTip.js";



function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const navigation = useNavigate();
  const [loggedIn, setloggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const jwt = localStorage.getItem('token');

    if (jwt) {
      api
        .getContent(jwt)
        .then((res) => {
          if (res) {
            localStorage.removeItem('allMovies');
            setloggedIn(true);
          }
          navigation(path);
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }, []);


  function handleLogin({ email, password }) {
    setIsLoading(true)
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          setloggedIn(true);
          localStorage.setItem('token', res.token);
          navigation('/movies');
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err)
      })
    .finally(() => {
        setIsLoading(false);
    })
  }

  function handleRegister({ name, email, password }) {
    api.register(name, email, password)
      .then(() => {
        handleLogin({ email, password });
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
      })
  }

  function handleUnauthorized(err) {
    if (err === 'Error: 401') {
      handleLogout();
    }
  }

  useEffect(() => {
    if (loggedIn) {
      api.getUserData()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn])

  function handleUpdateInfo(newUserInfo) {
    setIsLoading(true);
    api
      .editUserData(newUserInfo)
      .then((data) => {
        setIsUpdate(true);
        setCurrentUser(data);
      })
      .catch((err) => {
        setIsSuccess(false);
        console.log(err);
        handleUnauthorized(err);
      })
    .finally(() => {
      setIsLoading(false);
    });
  }



  const handleLogout = () => {
    setloggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('movies');
    localStorage.removeItem('search');
    localStorage.removeItem('prevSearchResults')
    navigation('/');
  };

  function closePopup() {
    setIsSuccess(true);
    setIsUpdate(false);
}


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SavedMoviesContextProvider value={savedMovies}
        context={{ savedMovies, setSavedMovies }}
      >


        <Routes>

          <Route
            element={(<>
              <Header theme={{ default: false }} loggedIn={loggedIn} />
              <Main />
            </>)}
            path='/'
            loggedIn={loggedIn}
          />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn} />
            } />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn} />
            }  />
          <Route
            path='/signin'
            element={!loggedIn
              ?
              <Login onAuthorize={handleLogin} isLoading={isLoading}/>
              :
              <Navigate to='/movies' />
            } />
          <Route
            path='/signup'
            element={!loggedIn
              ?
              <Register onRegister={handleRegister} isLoading={isLoading}/>
              :
              <Navigate to='/movies' />
            }  />
          <Route
            path='/profile'
            element={(
              <ProtectedRoute
                element={Profile}
                logOut={handleLogout}
                onUpdateInfo={handleUpdateInfo}
                loggedIn={loggedIn}
                isLoading={isLoading} >
              </ProtectedRoute>
            )} />

          <Route path="*" element={<Navigate to="/404" replace />} />
          <Route path="/404" element={<NotFound />} />

        </Routes>

        <InfoTooltip isSuccess={isSuccess} onClose={closePopup} />
        <InfoTooltip isSuccess={!isUpdate} isUpdate={isUpdate} onClose={closePopup} />

      </SavedMoviesContextProvider>
    </CurrentUserContext.Provider>
  );
}

export default App;
