import { useState, useEffect } from 'react';
import SearchShort from './searchShort/SearchShort';


function Search({ parameters, setParameters, handleSearchSubmit }) {
  const [searchValue, setSearchValue] = useState(parameters.querry);
  const [isShortChecked, setShortChecked] = useState(parameters.includeShorts);
  const [prevSearchResults, setPrevSearchResults] = useState([]);

  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  }
  useEffect(() => {
    setSearchValue(parameters.querry);
    setShortChecked(parameters.includeShorts);
  }, [parameters])


  const handleShortsCheck = () => {
    setShortChecked(!isShortChecked);
    setParameters({ ...parameters, includeShorts: !parameters.includeShorts });
  }

  return (
    <section className="movies">
      <section className="search__section">
        <form className="search" onSubmit={handleSearchSubmit}>
          <fieldset className="search__fieldset">
            <input type="text"
              name="request"
              placeholder="Фильм"
              onChange={handleChange}
              value={searchValue}
              className="search__input" required />
            <button className="search__button" type='submit'>
              Поиск
            </button>
          </fieldset>
          <SearchShort
            checkHandler={handleShortsCheck}
            isChecked={isShortChecked}
          />
        </form>
      </section>
    </section>
  )
}

export default Search
