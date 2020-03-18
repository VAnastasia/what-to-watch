import React from "react";
import propTypes from "prop-types";
import {defineLevelFilm} from "../../utils";
import Movie from "../../adapters/movie";
import UserBlock from "../user-block/user-block.jsx";

const MoviePage = ({film, isAuth}) => {
  const {
    title,
    backgroundImage,
    backgroundColor,
    posterImage,
    genre,
    year,
    description,
    rating,
    scores,
    director,
    actors
  } = new Movie(film);
  const ratingFixed = rating.toFixed(1);
  const actorList = actors.join(`, `);
  const ratingLevel = defineLevelFilm(rating);
  const style = {
    backgroundColor
  };
  return (
    <section className="movie-card movie-card--full" style={style}>
      <div className="movie-card__hero">
        <div className="movie-card__bg">
          <img src={backgroundImage} alt={title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <div className="logo">
            <a href="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <UserBlock isAuth={isAuth} />
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__desc">
            <h2 className="movie-card__title">{title}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genre}</span>
              <span className="movie-card__year">{year}</span>
            </p>

            <div className="movie-card__buttons">
              <button className="btn btn--play movie-card__button" type="button">
                <svg viewBox="0 0 19 19" width="19" height="19">
                  <use xlinkHref="#play-s"></use>
                </svg>
                <span>Play</span>
              </button>
              <button className="btn btn--list movie-card__button" type="button">
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref="#add"></use>
                </svg>
                <span>My list</span>
              </button>
              <a href="add-review.html" className="btn movie-card__button">Add review</a>
            </div>
          </div>
        </div>
      </div>

      <div className="movie-card__wrap movie-card__translate-top">
        <div className="movie-card__info">
          <div className="movie-card__poster movie-card__poster--big">
            <img src={posterImage} alt={`${title} poster`} width="218" height="327" />
          </div>

          <div className="movie-card__desc">
            <nav className="movie-nav movie-card__nav">
              <ul className="movie-nav__list">
                <li className="movie-nav__item movie-nav__item--active">
                  <a href="#" className="movie-nav__link">Overview</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Details</a>
                </li>
                <li className="movie-nav__item">
                  <a href="#" className="movie-nav__link">Reviews</a>
                </li>
              </ul>
            </nav>

            <div className="movie-rating">
              <div className="movie-rating__score">{ratingFixed}</div>
              <p className="movie-rating__meta">
                <span className="movie-rating__level">{ratingLevel}</span>
                <span className="movie-rating__count">{scores} ratings</span>
              </p>
            </div>

            <div className="movie-card__text">
              <p>{description}</p>

              <p className="movie-card__director"><strong>Director: {director}</strong></p>

              <p className="movie-card__starring"><strong>Starring: {actorList} and other</strong></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

MoviePage.propTypes = {
  film: propTypes.object.isRequired,
  isAuth: propTypes.bool.isRequired,
};

export default MoviePage;
