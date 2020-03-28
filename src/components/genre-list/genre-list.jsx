import React from "react";
import propTypes from "prop-types";
import {connect} from 'react-redux';
import {getGenre} from "../../reducers/app/selectors";
import {getMovies} from "../../reducers/data/selectors";
import {ActionCreator} from "../../reducers/app/app";
import {MAX_COUNT_GENRES, GENRE_DEFAULT} from "../../const";

const GenreList = ({activeGenre, movies, changeGenre}) => {
  const handleClick = (evt) => {
    evt.preventDefault();
    changeGenre(evt.target.textContent);
  };
  const genres = movies.slice().map((movie) => movie.genre);
  const genreList = [GENRE_DEFAULT].concat(Array.from(new Set(genres)).sort().slice(0, MAX_COUNT_GENRES));

  return (
    <ul className="catalog__genres-list">
      {genreList.map((title) => {
        const className = `catalog__genres-item ${activeGenre === title ? `catalog__genres-item--active` : ``}`;
        return (
          <li className={className} key={title}>
            <a href="#" className="catalog__genres-link" onClick={handleClick}>{title}</a>
          </li>
        );
      })}
    </ul>
  );
};

GenreList.propTypes = {
  activeGenre: propTypes.string.isRequired,
  changeGenre: propTypes.func.isRequired,
  movies: propTypes.arrayOf(
      propTypes.object.isRequired
  ).isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  activeGenre: getGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeGenre: (genre) => {
    dispatch(ActionCreator.changeGenre(genre));
  }
});

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
