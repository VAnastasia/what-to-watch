import React, {PureComponent, Fragment} from "react";
import propTypes from "prop-types";
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import MovieList from "../movie-list/movie-list.jsx";
import ShowMore from "../show-more/show-more.jsx";
import Movie from "../../adapters/movie";
import {getGenre, getShownMovies} from "../../reducers/app/selectors";
import {getMovies, getPromo} from "../../reducers/data/selectors";
import {getAuthorizationStatus} from "../../reducers/user/selectors";
import {ActionCreator} from "../../reducers/app/app";
import {Operation as DataOperation} from "../../reducers/data/data";
import {GENRE_DEFAULT, SHOW_MOVIES_ON_CLICK, AuthorizationStatus} from "../../const";
import history from "../../history";

const getFiltredMovies = (movies, activeGenre) => {
  if (activeGenre !== GENRE_DEFAULT) {
    return movies.slice().filter((movie) => movie.genre === activeGenre);
  }
  return movies;
};

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.handleClickShowMore = this.handleClickShowMore.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  handleClickShowMore() {
    const {changeShownMovies, shownMovies} = this.props;
    changeShownMovies(shownMovies + SHOW_MOVIES_ON_CLICK);
  }

  handleStatusChange() {
    const {authorizationStatus, promo, loadPromo, loadFilms, loadFavoriteFilms, changeStatusFilm} = this.props;
    if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
      history.push(`/login`);
      return;
    }
    const status = Number(!promo.is_favorite);
    const newFilm = Object.assign(promo, {"is_favorite": !promo.is_favorite});
    const onSucces = () => {
      loadPromo();
      loadFilms();
      loadFavoriteFilms();
    };
    changeStatusFilm(newFilm, status, onSucces);
  }

  componentDidMount() {
    this.props.loadPromo();
  }

  render() {
    const {
      promo,
      userBlock,
      movies,
      activeGenre,
      shownMovies,
      loadComments,
      genreList,
    } = this.props;
    const {id, title, genre, year, backgroundImage, posterImage, isFavorite} = new Movie(promo);
    const films = getFiltredMovies(movies, activeGenre);

    return (
      <Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={backgroundImage} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            {userBlock}
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__info">
              <div className="movie-card__poster">
                <img src={posterImage} alt="poster" width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{year}</span>
                </p>

                <div className="movie-card__buttons">
                  <Link to={`/player/${id}`} className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </Link>
                  <button className="btn btn--list movie-card__button" type="button" onClick={this.handleStatusChange}>
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      {!isFavorite ? <use xlinkHref="#add"></use> : <use xlinkHref="#in-list"></use>}
                    </svg>
                    <span>My list</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            {genreList}

            <MovieList movies={films.slice(0, shownMovies)} loadComments={loadComments} />

            {shownMovies < films.length && <ShowMore onClick={this.handleClickShowMore} />}
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
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
      </Fragment>
    );
  }

}

Main.propTypes = {
  promo: propTypes.object.isRequired,
  movies: propTypes.arrayOf(
      propTypes.object.isRequired
  ).isRequired,
  activeGenre: propTypes.string.isRequired,
  shownMovies: propTypes.number.isRequired,
  changeShownMovies: propTypes.func.isRequired,
  loadComments: propTypes.func.isRequired,
  loadFilms: propTypes.func.isRequired,
  loadPromo: propTypes.func.isRequired,
  loadFavoriteFilms: propTypes.func.isRequired,
  changeStatusFilm: propTypes.func.isRequired,
  userBlock: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired,
  genreList: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired,
  authorizationStatus: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  promo: getPromo(state),
  movies: getMovies(state),
  shownMovies: getShownMovies(state),
  activeGenre: getGenre(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeShownMovies: (amount) => {
    dispatch(ActionCreator.changeMoviesAmount(amount));
  },
  loadComments(id) {
    dispatch(DataOperation.loadComments(id));
  },
  loadPromo() {
    dispatch(DataOperation.loadPromo());
  },
  loadFilms() {
    dispatch(DataOperation.loadFilms());
  },
  loadFavoriteFilms() {
    dispatch(DataOperation.loadFavoriteFilms());
  },
  changeStatusFilm(id, status, onSuccess) {
    dispatch(DataOperation.changeStatusFilm(id, status, onSuccess));
  },
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
