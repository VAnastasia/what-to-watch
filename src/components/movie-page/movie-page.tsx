import * as React from "react";
import {Link} from "react-router-dom";
import Movie from "../../adapters/movie";
import Tabs from "../tabs/tabs";
import SimilarMovies from "../similar-movies/similar-movies";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab";
import {SIMILAR_MOVIES_AMOUNT, AuthorizationStatus} from "../../const";
import history from "../../history";
import {MovieTypes, CommentTypes} from "../../types";

interface Props {
  film: MovieTypes;
  comments: CommentTypes[];
  movies: MovieTypes[];
  authorizationStatus: string;
  userBlock: React.ReactNode;
  loadComments: () => void;
  loadPromo: () => void;
  loadFilms: () => void;
  loadFavoriteFilms: () => void;
  changeStatusFilm: (
    newFilm: MovieTypes,
    status: number,
    onSuccess: () => void
  ) => void;
}

const TabsWrapped = withActiveTab(Tabs);

const MoviePage: React.FunctionComponent<Props> = (props: Props) => {
  const {
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
  } = props;

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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
  return (<h1 style={{textAlign: `center`}}>Loading...</h1>);
};

export default MoviePage;
