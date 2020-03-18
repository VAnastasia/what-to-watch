import React from "react";
import propTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";
import Movie from "../../adapters/movie";

const MovieCard = ({film, onHover, onLeave, activeCard, onMovieCardClick}) => {
  const {id, title, previewImage, videoPreview} = new Movie(film);

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={onHover(id)}
      onMouseLeave={onLeave}
      onClick={onMovieCardClick}
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
  onHover: propTypes.func.isRequired,
  onLeave: propTypes.func.isRequired,
  activeCard: propTypes.number.isRequired,
  onMovieCardClick: propTypes.func.isRequired,
};

export default MovieCard;
