import React from "react";
import propTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import Movie from "../../adapters/movie";
import history from "../../history.js";

const MovieCard = ({film, onHover, onLeave, activeCard, loadComments}) => {
  const {id, title, previewImage, videoPreview} = new Movie(film);
  const handleClick = (idFilm) => {
    return () => {
      loadComments(id);
      history.push(`/films/${idFilm}`);
    };
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={onHover(id)}
      onMouseLeave={onLeave}
      onClick={handleClick(id)}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          videoSrc={videoPreview}
          posterSrc={previewImage}
          isPlaying={activeCard === id}
        />
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
  onHover: propTypes.func,
  onLeave: propTypes.func,
  activeCard: propTypes.number,
  loadComments: propTypes.func.isRequired,
};

export default MovieCard;
