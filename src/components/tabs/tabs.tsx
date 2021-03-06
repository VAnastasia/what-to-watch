import * as React from "react";
import Movie from "../../adapters/movie";
import {defineLevelFilm, getRuntime, formatDate} from "../../utils";
import {TabName} from "../../const";
import {MovieTypes, CommentTypes} from "../../types";

type TabsProps = {
  film: MovieTypes;
  comments: CommentTypes[];
  activeTab: string;
  loadComments: (id: number) => void;
  onClick: (tab: string) => string;
}

const ACTIVE_CLASS = `movie-nav__item movie-nav__item--active`;
const NO_ACTIVE_CLASS = `movie-nav__item`;

const setTabClassName = (activeTab, currentTab) => {
  return activeTab === currentTab ? ACTIVE_CLASS : NO_ACTIVE_CLASS;
};

class Tabs extends React.PureComponent<TabsProps, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadComments, film} = this.props;
    loadComments(film.id);
  }

  render() {
    const {film, comments, onClick, activeTab} = this.props;
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
    const actorList = actors !== undefined ? actors.join(`, `) : [];
    const ratingLevel = defineLevelFilm(rating);
    const time = getRuntime(runtime);

    return (
      <div className="movie-card__desc">
        <nav className="movie-nav movie-card__nav">
          <ul className="movie-nav__list">
            <li className={setTabClassName(activeTab, TabName.OVERVIEW)}>
              <a className="movie-nav__link" onClick={() => onClick(TabName.OVERVIEW.toUpperCase())}>{TabName.OVERVIEW}</a>
            </li>
            <li className={setTabClassName(activeTab, TabName.DETAILS)}>
              <a className="movie-nav__link" onClick={() => onClick(TabName.DETAILS.toUpperCase())}>{TabName.DETAILS}</a>
            </li>
            <li className={setTabClassName(activeTab, TabName.REVIEWS)}>
              <a className="movie-nav__link" onClick={() => onClick(TabName.REVIEWS.toUpperCase())}>{TabName.REVIEWS}</a>
            </li>
          </ul>
        </nav>
        {activeTab === TabName.OVERVIEW && (
          <React.Fragment>
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
          </React.Fragment>
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
                    <React.Fragment key={actor}>
                      {actor}<br/>
                    </React.Fragment>
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
                return (index % 2 === 0) && (
                  <div className="review" key={comment.user.id}>
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
              })}
            </div>
            <div className="movie-card__reviews-col">
              {comments.map((comment, index) => {
                return (index % 2 === 1) && (
                  <div className="review" key={comment.user.id}>
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
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Tabs;
