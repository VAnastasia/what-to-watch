import React from "react";
import propTypes from "prop-types";
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
      propTypes.shape({
        "id": propTypes.number.isRequired,
        "name": propTypes.string.isRequired,
        "poster_image": propTypes.string.isRequired,
        "preview_image": propTypes.string.isRequired,
        "background_image": propTypes.string.isRequired,
        "background_color": propTypes.string.isRequired,
        "description": propTypes.string.isRequired,
        "rating": propTypes.number.isRequired,
        "scores_count": propTypes.number.isRequired,
        "director": propTypes.string.isRequired,
        "starring": propTypes.arrayOf(propTypes.string).isRequired,
        "run_time": propTypes.number.isRequired,
        "genre": propTypes.string.isRequired,
        "released": propTypes.number.isRequired,
        "is_favorite": propTypes.bool.isRequired,
        "video_link": propTypes.string.isRequired,
        "preview_video_link": propTypes.string.isRequired,
      })
  ).isRequired,
};

export default GenreList;
