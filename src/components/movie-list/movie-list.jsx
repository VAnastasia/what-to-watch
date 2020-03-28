import React from "react";
import propTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";
import withActiveCard from "../../hocs/with-active-card/with-active-card.jsx";

const MovieCardWrapped = withActiveCard(MovieCard);

const MovieList = ({movies, loadComments}) => {
  return (
    <div className="catalog__movies-list">
      {movies.map((film) => {
        return (
          <MovieCardWrapped
            key={film.id}
            film={film}
            loadComments={loadComments}
          />
        );
      })}
    </div>
  );
};

MovieList.propTypes = {
  movies: propTypes.arrayOf(
      propTypes.object.isRequired
  ).isRequired,
  loadComments: propTypes.func.isRequired,
};

export default MovieList;
