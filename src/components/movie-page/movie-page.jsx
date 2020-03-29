import React, {Fragment} from "react";
import propTypes from "prop-types";
import {Link} from "react-router-dom";
import Movie from "../../adapters/movie";
import Tabs from "../tabs/tabs.jsx";
import SimilarMovies from "../similar-movies/similar-movies.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.jsx";
import {SIMILAR_MOVIES_AMOUNT, AuthorizationStatus} from "../../const";
import history from "../../history";

const TabsWrapped = withActiveTab(Tabs);

const MoviePage = ({
  film,
  comments,
  movies,
  loadComments,
  loadPromo,
  userBlock,
  authorizationStatus,
  loadFilms,
  loadFavoriteFilms,
  changeStatusFilm,
  // isLoadMovies,
}) => {
  if (film) {
    const {
      id,
      title,
      backgroundImage,
      backgroundColor,
      posterImage,
      genre,
      year,
    } = new Movie(film);

    const similarMovies = movies.filter((movie) => movie.genre === genre && movie.id !== id).slice(0, SIMILAR_MOVIES_AMOUNT);

    const handleStatusChange = () => {
      if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        history.push(`/login`);
        return;
      }
      const status = Number(!film.is_favorite);
      const newFilm = Object.assign(film, {"is_favorite": !film.is_favorite});
      const onSucces = () => {
        loadPromo();
        loadFilms();
        loadFavoriteFilms();
      };
      changeStatusFilm(newFilm, status, onSucces);
    };

    return (
      <Fragment>
        <section className="movie-card movie-card--full" style={{backgroundColor}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={backgroundImage} alt={title} />
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header movie-card__head">
              <div className="logo">
                <Link to="/" className="logo__link">
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </Link>
              </div>
              {userBlock}
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{year}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link
                    to={`/player/${id}`}
                    className="btn btn--play movie-card__button"
                    type="button"
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <button
                    className="btn btn--list movie-card__button"
                    type="button"
                    onClick={handleStatusChange}
                  >
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      {!film.is_favorite ? <use xlinkHref="#add"></use> : <use xlinkHref="#in-list"></use>}
                    </svg>
                    <span>My list</span>
                  </button>
                  {authorizationStatus === AuthorizationStatus.AUTH && (
                    <Link
                      to={`/films/${id}/review`}
                      className="btn movie-card__button"
                    >
                        Add review
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={posterImage} alt={`${title} poster`} width="218" height="327" />
              </div>

              <TabsWrapped
                film={film}
                comments={comments}
                loadComments={loadComments}
              />
            </div>
          </div>
        </section>

        <SimilarMovies
          films={similarMovies}
          loadComments={loadComments}
        />
      </Fragment>
    );
  }
  return (<h1 style={{textAlign: `center`}}>Loading...</h1>);
};

MoviePage.propTypes = {
  film: propTypes.shape({
    "id": propTypes.number,
    "name": propTypes.string,
    "poster_image": propTypes.string,
    "preview_image": propTypes.string,
    "background_image": propTypes.string,
    "background_color": propTypes.string,
    "description": propTypes.string,
    "rating": propTypes.number,
    "scores_count": propTypes.number,
    "director": propTypes.string,
    "starring": propTypes.arrayOf(propTypes.string),
    "run_time": propTypes.number,
    "genre": propTypes.string,
    "released": propTypes.number,
    "is_favorite": propTypes.bool,
    "video_link": propTypes.string,
    "preview_video_link": propTypes.string,
  }),
  loadComments: propTypes.func.isRequired,
  loadFilms: propTypes.func.isRequired,
  loadFavoriteFilms: propTypes.func.isRequired,
  loadPromo: propTypes.func.isRequired,
  changeStatusFilm: propTypes.func.isRequired,
  comments: propTypes.arrayOf(
      propTypes.shape({
        "user": propTypes.shape({
          "id": propTypes.number.isRequired,
          "name": propTypes.string.isRequired,
        }),
        "rating": propTypes.number.isRequired,
        "comment": propTypes.string.isRequired,
        "date": propTypes.string.isRequired,
      })
  ).isRequired,
  movies: propTypes.arrayOf(
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
  authorizationStatus: propTypes.string.isRequired,
  userBlock: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired,
};

export default MoviePage;
