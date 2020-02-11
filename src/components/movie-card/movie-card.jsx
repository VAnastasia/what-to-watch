import React from "react";
import propTypes from "prop-types";

const MovieCard = ({film, onHover}) => {
  const {id, title, image} = film;
  return (
    <article
      data-id={id}
      className="small-movie-card catalog__movies-card"
      onMouseOver={onHover}
    >
      <div className="small-movie-card__image">
        <img src={image} alt={title} width="280" height="175" />
      </div>
      <h3 className="small-movie-card__title">
        <a
          className="small-movie-card__link"
          href="movie-page.html"
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
  }).isRequired,
  onHover: propTypes.func.isRequired,
};

export default MovieCard;
