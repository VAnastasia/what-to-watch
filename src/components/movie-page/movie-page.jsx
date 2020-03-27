import React, {PureComponent, Fragment} from "react";
import propTypes from "prop-types";
import Movie from "../../adapters/movie";
import Tabs from "../tabs/tabs.jsx";
import SimilarMovies from "../similar-movies/similar-movies.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab.jsx";
import history from "../../history.js";

const TabsWrapped = withActiveTab(Tabs);

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
    this.film = new Movie(this.props.film);
    this.handlePlayButtonClick = this.handlePlayButtonClick(this);
    this.handleLogoClick = this.handleLogoClick.bind(this);
    this.handleAddReviewClick = this.handleAddReviewClick.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  handleLogoClick(evt) {
    evt.preventDefault();
    history.push(`/`);
  }

  handlePlayButtonClick() {
    return () => {
      const {id} = this.film;
      history.push(`/player/${id}`);
    };
  }

  handleAddReviewClick(evt) {
    evt.preventDefault();
    const {id} = this.film;
    history.push(`/films/${id}/review`);
  }

  handleStatusChange() {
    const {film, loadFilms, loadFavoriteFilms, changeStatusFilm} = this.props;
    const status = Number(!film.is_favorite);
    const newFilm = Object.assign(this.props.film, {"is_favorite": !film.is_favorite});
    const onSucces = () => {
      loadFilms();
      loadFavoriteFilms();
    };
    changeStatusFilm(newFilm, status, onSucces);
  }

  render() {
    const {
      film,
      comments,
      movies,
      loadComments,
      userBlock,
      authorizationStatus,
    } = this.props;

    const {
      id,
      title,
      backgroundImage,
      backgroundColor,
      posterImage,
      genre,
      year,
    } = this.film;

    const similarMovies = movies.filter((movie) => movie.genre === genre && movie.id !== id).slice(0, 4);

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
                <a href="#" className="logo__link" onClick={this.handleLogoClick}>
                  <span className="logo__letter logo__letter--1">W</span>
                  <span className="logo__letter logo__letter--2">T</span>
                  <span className="logo__letter logo__letter--3">W</span>
                </a>
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
                  <button className="btn btn--play movie-card__button" type="button" onClick={this.handlePlayButtonClick}>
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button" onClick={this.handleStatusChange}>
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      {!film.is_favorite ? <use xlinkHref="#add"></use> : <use xlinkHref="#in-list"></use>}
                    </svg>
                    <span>My list</span>
                  </button>
                  {authorizationStatus === `AUTH` && (
                    <a href="#" className="btn movie-card__button" onClick={this.handleAddReviewClick}>Add review</a>
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

        <SimilarMovies films={similarMovies} loadComments={loadComments} />
      </Fragment>
    );
  }
}

MoviePage.propTypes = {
  film: propTypes.object.isRequired,
  loadComments: propTypes.func.isRequired,
  loadFilms: propTypes.func.isRequired,
  loadFavoriteFilms: propTypes.func.isRequired,
  changeStatusFilm: propTypes.func.isRequired,
  comments: propTypes.array.isRequired,
  movies: propTypes.array.isRequired,
  authorizationStatus: propTypes.string.isRequired,
  userBlock: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired,
};

export default MoviePage;
