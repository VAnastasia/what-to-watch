import React, {Fragment} from "react";
import propTypes from "prop-types";
import Movie from "../../adapters/movie";
import {defineLevelFilm, getRuntime, formatDate} from "../../utils";
import {TabName} from "../../const";

const ACTIVE_CLASS = `movie-nav__item movie-nav__item--active`;
const NO_ACTIVE_CLASS = `movie-nav__item`;

const Tabs = ({film, onClick, activeTab, comments}) => {
  const {
    genre,
    year,
    description,
    rating,
    scores,
    director,
    actors,
    runtime
  } = new Movie(film);

  const ratingFixed = rating.toFixed(1);
  const actorList = actors.join(`, `);
  const ratingLevel = defineLevelFilm(rating);
  const time = getRuntime(runtime);

  return (
    <div className="movie-card__desc">
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          <li className={activeTab === `Overview` ? ACTIVE_CLASS : NO_ACTIVE_CLASS}>
            <a className="movie-nav__link" onClick={onClick(`OVERVIEW`)}>Overview</a>
          </li>
          <li className={activeTab === `Details` ? ACTIVE_CLASS : NO_ACTIVE_CLASS}>
            <a className="movie-nav__link" onClick={onClick(`DETAILS`)}>Details</a>
          </li>
          <li className={activeTab === `Reviews` ? ACTIVE_CLASS : NO_ACTIVE_CLASS}>
            <a className="movie-nav__link" onClick={onClick(`REVIEWS`)}>Reviews</a>
          </li>
        </ul>
      </nav>
      {activeTab === TabName.OVERVIEW && (
        <Fragment>
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
        </Fragment>
      )}


      {activeTab === TabName.DETAILS && (
        <div className="movie-card__text movie-card__row">
          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Director</strong>
              <span className="movie-card__details-value">{director}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Starring</strong>
              <span className="movie-card__details-value">
                {actors.map((actor) =>
                  <Fragment key={actor}>
                    {actor}<br/>
                  </Fragment>
                )}

              </span>
            </p>
          </div>

          <div className="movie-card__text-col">
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Run Time</strong>
              <span className="movie-card__details-value">{time}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Genre</strong>
              <span className="movie-card__details-value">{genre}</span>
            </p>
            <p className="movie-card__details-item">
              <strong className="movie-card__details-name">Released</strong>
              <span className="movie-card__details-value">{year}</span>
            </p>
          </div>
        </div>
      )}

      {activeTab === TabName.REVIEWS && (
        <div className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            {comments.map((comment, index) => {
              if (index % 2 === 0) {
                return (
                  <div className="review" key={comment.id}>
                    <blockquote className="review__quote">
                      <p className="review__text">{comment.comment}</p>

                      <footer className="review__details">
                        <cite className="review__author">{comment.user.name}</cite>
                        <time className="review__date" dateTime={comment.date.slice(0, 10)}>{formatDate(new Date(comment.date))}</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{comment.rating}</div>
                  </div>
                );
              } else {
                return false;
              }
            })}
          </div>
          <div className="movie-card__reviews-col">
            {comments.map((comment, index) => {
              if (index % 2 === 1) {
                return (
                  <div className="review" key={comment.id}>
                    <blockquote className="review__quote">
                      <p className="review__text">{comment.comment}</p>

                      <footer className="review__details">
                        <cite className="review__author">{comment.user.name}</cite>
                        <time className="review__date" dateTime={comment.date.slice(0, 10)}>{formatDate(new Date(comment.date))}</time>
                      </footer>
                    </blockquote>

                    <div className="review__rating">{comment.rating}</div>
                  </div>
                );
              } else {
                return false;
              }
            })}
          </div>
        </div>
      )}
    </div>
  );
};

Tabs.propTypes = {
  onClick: propTypes.func.isRequired,
  activeTab: propTypes.string.isRequired,
  film: propTypes.object.isRequired,
  comments: propTypes.array.isRequired,
};

export default Tabs;
