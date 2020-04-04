import * as React from "react";
import {MAX_COUNT_GENRES, GENRE_DEFAULT} from "../../const";
import {MovieTypes} from "../../types";

interface Props {
  movies: MovieTypes[];
  activeGenre: string;
  changeGenre: (genre: string) => void;
}

const GenreList: React.FunctionComponent<Props> = (props: Props) => {
  const {activeGenre, movies, changeGenre} = props;
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

export default GenreList;
