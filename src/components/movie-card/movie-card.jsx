import React from "react";
import propTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

class Movie {
  constructor(film) {
    this.id = film.id;
    this.title = film.name;
    this.image = film.preview_image;
    this.video = film.preview_video_link;
  }
}

const MovieCard = ({film, onHover, onLeave, onClick, activeCard}) => {
  const {id, title, image, video} = new Movie(film);

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseOver={onHover(id)}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div className="small-movie-card__image">
        <VideoPlayer
          videoSrc={video}
          posterSrc={image}
          isPlaying={activeCard === id}
        />
      </div>
      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="/"
        >{title}</a>
      </h3>
    </article>
  );
};

MovieCard.propTypes = {
  film: propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
    video: propTypes.string.isRequired,
  }).isRequired,
  onHover: propTypes.func.isRequired,
  onClick: propTypes.func.isRequired,
  onLeave: propTypes.func.isRequired,
  activeCard: propTypes.number.isRequired,
};

export default MovieCard;
