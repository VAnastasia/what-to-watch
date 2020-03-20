import React, {PureComponent, Fragment} from "react";
import propTypes from "prop-types";
import Movie from "../../adapters/movie";
import Tabs from "../tabs/tabs.jsx";
import UserBlock from "../user-block/user-block.jsx";
import {defineLevelFilm, getRuntime} from "../../utils";

const TabName = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
    this.handleTabClick = this.handleTabClick.bind(this);

    this.state = {
      activeTab: TabName.OVERVIEW,
    };
  }

  handleTabClick(tab) {
    return () => {
      this.setState({
        activeTab: TabName[tab],
      });
    };
  }

  componentDidMount() {
    const {film, loadComments} = this.props;
    const id = film.id;
    loadComments(id);
  }

  render() {
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
      actors,
      runtime
    } = new Movie(this.props.film);

    const {isAuth} = this.props.isAuth;

    const style = {
      backgroundColor,
    };

    const ratingFixed = rating.toFixed(1);
    const actorList = actors.join(`, `);
    const ratingLevel = defineLevelFilm(rating);
    const time = getRuntime(runtime);

    const {comments} = this.props;

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
              <Tabs onClick={this.handleTabClick} activeTab={this.state.activeTab} />
              {this.state.activeTab === TabName.OVERVIEW && (
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


              {this.state.activeTab === TabName.DETAILS && (
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

              {this.state.activeTab === TabName.REVIEWS && (
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
                                <time className="review__date" dateTime="2015-11-18">{comment.date}</time>
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
                                <time className="review__date" dateTime="2015-11-18">{comment.date}</time>
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
          </div>
        </div>
      </section>
    );
  }
}

MoviePage.propTypes = {
  film: propTypes.object.isRequired,
  isAuth: propTypes.bool.isRequired,
  loadComments: propTypes.func.isRequired,
  comments: propTypes.array.isRequired,
};

export default MoviePage;
