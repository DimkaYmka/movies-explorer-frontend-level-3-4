import { useLocation } from 'react-router-dom';
import { convertMinutes } from '../../utils/utils';
import { useEffect, useState } from 'react';
import { useSavedMoviesContext } from '../../context/SavedMovieContextProvider';
import api from '../../utils/MainApi';
import MovieButton from '../MovieButton/MovieButton'

const checkMovieDuration = (movieDuration, isShortsIncluded, shortsDurationCriteria = 40) => {
  return (isShortsIncluded && (movieDuration <= shortsDurationCriteria)) || (!isShortsIncluded && (movieDuration > shortsDurationCriteria));
}

const filterMovieByQuerry = (movie, searchQuerry) => {
  const lowerQuerry = searchQuerry.toLowerCase();
  return movie.nameRU.toLowerCase().includes(lowerQuerry);
}

export const movieFilter = (movie, { querry, includeShorts }) => {
  return (includeShorts && (movie.duration <= 40) && filterMovieByQuerry(movie, querry)) ||
         (!includeShorts && filterMovieByQuerry(movie, querry));
}

function MovieSection({ movieData }) {
  const { pathname } = useLocation();
  const [isMovieSaved, setIsMovieSaved] = useState(false);
  const { savedMovies, setSavedMovies } = useSavedMoviesContext();

  const [isDeleted, setIsDeleted] = useState(false);

  const moviesUrl = 'https://api.nomoreparties.co/';

  useEffect(() => {
    setIsMovieSaved(savedMovies.some(movie => movie.movieId === movieData.id || movie.movieId === movieData.movieId));
  }, [savedMovies, movieData])

  function deleteMovie() {
    const deleteParam = pathname === '/movies'
      ? movieData.id
      : movieData.movieId;

    const movieToDelete = savedMovies.find(movie => movie.movieId === deleteParam);
    const movieToDeleteIndex = savedMovies.findIndex(movie => movie.movieId === deleteParam);

    api.deleteSavedMovie(movieToDelete._id)
      .then(movieData => {
        setSavedMovies(prevMovies => {
          const updatedMovies = [...prevMovies];
          updatedMovies.splice(movieToDeleteIndex, 1);
          return updatedMovies;
        });
        setIsDeleted(true);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    setIsDeleted(false); // Сбрасываем значение isDeleted при изменении movieData
  }, [movieData]);





  const saveMovie = () => {
    const savingMovieInfo = {
      ...movieData,
      movieId: movieData.id,
      image: `${moviesUrl}${movieData.image.url}`,
      thumbnail: `${moviesUrl}${movieData.image.formats.thumbnail.url}`,
    };
    delete savingMovieInfo.id;
    delete savingMovieInfo.created_at;
    delete savingMovieInfo.updated_at;
    api.NewSavedMovie(savingMovieInfo)
      .then(movie => {
        setSavedMovies([...savedMovies, movie]);
      })
      .catch(err => {
        console.log(err);
      })
  }



  if (isDeleted && pathname === "/saved-movies") {
    return null;
  }

  return (
    <li className="movie-section__item">
      <div className="movie-section__description">
        <h3 className="movie-section__title">{movieData.nameRU}</h3>
        <p className="movie-section__duration">{convertMinutes(+movieData.duration)}</p>
      </div>
      <a href={movieData.trailerLink} className="movie-section__link">
        <img className="movie-section__image"
          src={pathname === "/movies"
            ? `${moviesUrl}/${movieData.image.url}`
            : movieData.image}
          alt={movieData.nameRU} />
      </a>
      <MovieButton
        onClickHandler={isMovieSaved ? deleteMovie : saveMovie}
        typeClass={isMovieSaved && pathname === "/movies"} >
        {pathname === "/movies" ? 'Сохранить' : 'X'}
      </MovieButton>
    </li>

  )
}

export default MovieSection;
