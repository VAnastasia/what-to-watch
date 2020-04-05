import * as React from "react";
import Movie from "../../adapters/movie";
import history from "../../history";
import {MovieTypes} from "../../types";
import {noop} from "../../const";

interface Props {
  film: MovieTypes;
  loadComments: (id: number) => void;
  onMovieCardHover?: (id: number) => number;
  onMovieCardOut?: () => void;
  isPlayer?: boolean;
  activeCard?: number;
}

const MovieCard: React.FunctionComponent<Props> = (props: Props) => {
  const {
    film,
    loadComments,
    onMovieCardHover = noop,
    onMovieCardOut = noop,
    isPlayer = false,
    activeCard = -1,
  } = props;
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
      onMouseOver={() => onMovieCardHover(id)}
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

export default MovieCard;
