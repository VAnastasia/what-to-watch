import React, {Fragment} from "react";
import propTypes from "prop-types";
import {connect} from 'react-redux';
// import {Link} from "react-router-dom";
import withActiveCard from "../../hocs/with-active-card/with-active-card.jsx";
import MovieList from "../movie-list/movie-list.jsx";
// import GenreList from "../genre-list/genre-list.jsx";
import ShowMore from "../show-more/show-more.jsx";
import Movie from "../../adapters/movie";
import {getGenre, getShownMovies} from "../../reducers/app/selectors";
import {getMovies} from "../../reducers/data/selectors";
import {ActionCreator} from "../../reducers/app/app";
import {Operation as DataOperation} from "../../reducers/data/data.js";
import {GENRE_DEFAULT, SHOW_MOVIES_ON_CLICK} from "../../const";
import history from "../../history.js";

const MovieListWrapped = withActiveCard(MovieList);

const getFiltredMovies = (movies, activeGenre) => {
  if (activeGenre !== GENRE_DEFAULT) {
    return movies.slice().filter((movie) => movie.genre === activeGenre);
  }
  return movies;
};

const Main = ({
  promoFilm,
  userBlock,
  movies,
  activeGenre,
  shownMovies,
  changeShownMovies,
  loadComments,
  genreList
}) => {
  const {id, title, genre, year, backgroundImage, posterImage, isFavorite} = new Movie(promoFilm);
  const films = getFiltredMovies(movies, activeGenre);

  const onClickShowMore = () => changeShownMovies(shownMovies + SHOW_MOVIES_ON_CLICK);
  const handlePlayButtonClick = () => history.push(`/player/${id}`);

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
                <button className="btn btn--play movie-card__button" type="button" onClick={handlePlayButtonClick}>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
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

          <MovieListWrapped movies={films.slice(0, shownMovies)} loadComments={loadComments} />

          {shownMovies < films.length && <ShowMore onClick={onClickShowMore} />}
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
};

Main.propTypes = {
  promoFilm: propTypes.object.isRequired,
  movies: propTypes.arrayOf(
      propTypes.object.isRequired
  ).isRequired,
  activeGenre: propTypes.string.isRequired,
  shownMovies: propTypes.number.isRequired,
  changeShownMovies: propTypes.func.isRequired,
  loadComments: propTypes.func.isRequired,
  userBlock: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired,
  genreList: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  shownMovies: getShownMovies(state),
  activeGenre: getGenre(state),
});

const mapDispatchToProps = (dispatch) => ({
  changeShownMovies: (amount) => {
    dispatch(ActionCreator.changeMoviesAmount(amount));
  },
  loadComments(id) {
    dispatch(DataOperation.loadComments(id));
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
