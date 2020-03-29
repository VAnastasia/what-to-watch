import React from "react";
import propTypes from "prop-types";
import {Link} from "react-router-dom";
import MovieCard from "../movie-card/movie-card.jsx";

const SimilarMovies = ({films, loadComments}) => {
  return (
    <div className="page-content">
      {films.length > 0 && (
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            {films.map((film) => {
              return (
                <MovieCard
                  key={film.id}
                  film={film}
                  loadComments={loadComments}
                />);
            })}
          </div>
        </section>
      )}
      <footer className="page-footer">
        <div className="logo">
          <Link to="/" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

SimilarMovies.propTypes = {
  films: propTypes.arrayOf(
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

export default SimilarMovies;
