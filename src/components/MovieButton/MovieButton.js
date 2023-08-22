const MovieCardButton = ({ onClickHandler, typeClass, children }) => {
  const buttonModificator = typeClass ? 'movie-section__button_saved' : '';

  return (
    <button
      className={`movie-section__button ${buttonModificator}`}
      type="button"
      onClick={onClickHandler}
    >
      {typeClass ? '' : children}
    </button>
  )
};

export default MovieCardButton;
