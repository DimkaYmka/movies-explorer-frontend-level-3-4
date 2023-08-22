import MovieSection from '../MovieSection/MovieSection.js'
import { useLocation } from 'react-router-dom';
import Preloader from "../Preloader/Preloader";
import SearchError from '../SearchErr/SearchErr.js';

function MoviesCardList({ moviesData, isLoading, isNotFound }) {

  const { pathname } = useLocation();

  return (
    <main className="movie-section" >
      {isLoading && <Preloader />}
      {isNotFound && !isLoading && <SearchError errorText={'Ничего не найдено'} />}
      <ul className="movie-section__list">
        {
          moviesData.map((movie) => (
            <MovieSection key={
              pathname === "/movies"
                ? movie.id
                : movie._id
            } movieData={movie} />
          ))
        }
      </ul>
    </main>
  )
};

export default MoviesCardList;
