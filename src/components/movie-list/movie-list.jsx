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
  loadComments: propTypes.func.isRequired,
};

export default MovieList;
