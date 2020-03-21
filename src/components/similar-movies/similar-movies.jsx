import React from "react";
import propTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

const SimilarMovies = ({films, loadComments}) => {
  return (
    <div className="page-content">
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>

        <div className="catalog__movies-list">
          {films.map((film) => {
            return (
              <MovieCard
                key={film.id}
                film={film}
                loadComments={loadComments}
                activeCard={0}
                onLeave={() => {}}
                onHover={() => {}}
              />);
          })}
        </div>
      </section>
      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

SimilarMovies.propTypes = {
  films: propTypes.array.isRequired,
  loadComments: propTypes.func.isRequired,
};

export default SimilarMovies;
