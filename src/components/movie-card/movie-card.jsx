import React from "react";
import propTypes from "prop-types";
import Movie from "../../adapters/movie";
import history from "../../history.js";

const MovieCard = ({
  film,
  loadComments,
  onMovieCardHover = () => {},
  onMovieCardOut = () => {},
  isPlayer = false,
  activeCard = -1,
}) => {
  const {id, title, videoPreview, previewImage} = new Movie(film);

  const handleClick = (idFilm) => {
    return () => {
      loadComments(id);
      history.push(`/films/${idFilm}`);
    };
  };

  const src = activeCard === id ? videoPreview : ``;

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={onMovieCardHover(id)}
      onMouseLeave={onMovieCardOut}
      onClick={handleClick(id)}
    >
      <div className="small-movie-card__image">
        {isPlayer ?
          <video
            poster={previewImage}
            src={src}
            autoPlay
            muted
            alt=""
            width="280"
            height="175"
          /> :
          <img
            src={previewImage}
            alt={title}
            width="280"
            height="175"
          />
        }
      </div>
      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
        >{title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  film: propTypes.object.isRequired,
  onMovieCardHover: propTypes.func,
  onMovieCardOut: propTypes.func,
  activeCard: propTypes.number,
  loadComments: propTypes.func.isRequired,
  isPlayer: propTypes.bool,
};

export default MovieCard;
