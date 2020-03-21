import React, {PureComponent} from "react";
import propTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MovieList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {movies, activeCard, onMovieCardHover, onMovieCardOut, loadComments} = this.props;

    return (
      <div className="catalog__movies-list">
        {movies.map((film) => {
          return (
            <MovieCard
              key={film.id}
              film={film}
              onHover={onMovieCardHover}
              onLeave={onMovieCardOut}
              activeCard={activeCard}
              loadComments={loadComments}
            />
          );
        })}
      </div>
    );
  }
}

MovieList.propTypes = {
  movies: propTypes.arrayOf(
      propTypes.object.isRequired
  ).isRequired,
  onMovieCardHover: propTypes.func,
  onMovieCardOut: propTypes.func,
  activeCard: propTypes.number,
  loadComments: propTypes.func.isRequired,
};

export default MovieList;
