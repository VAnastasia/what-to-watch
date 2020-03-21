import React, {PureComponent, Fragment} from "react";
import propTypes from "prop-types";
import Movie from "../../adapters/movie";
import Tabs from "../tabs/tabs.jsx";
import UserBlock from "../user-block/user-block.jsx";
import SimilarMovies from "../similar-movies/similar-movies.jsx";

// import MovieList from "../movie-list/movie-list.jsx";

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

  render() {
    const {
      id,
      title,
      backgroundImage,
      backgroundColor,
      posterImage,
      genre,
      year,
    } = new Movie(this.props.film);

    const style = {
      backgroundColor,
    };

    const {film, comments, authorizationStatus, movies, loadComments} = this.props;
    const similarMovies = movies.filter((movie) => movie.genre === genre && movie.id !== id).slice(0, 4);

    return (
      <Fragment>
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

              <UserBlock authorizationStatus={authorizationStatus} />
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

              <Tabs
                film={film}
                onClick={this.handleTabClick}
                activeTab={this.state.activeTab}
                comments={comments}
              />
            </div>
          </div>
        </section>

        <SimilarMovies films={similarMovies} loadComments={loadComments} />

        {/* <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <div className="catalog__movies-list">
              <MovieList movies={similarMovies} />
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
        </div> */}
      </Fragment>
    );
  }
}

MoviePage.propTypes = {
  film: propTypes.object.isRequired,
  authorizationStatus: propTypes.string.isRequired,
  loadComments: propTypes.func.isRequired,
  comments: propTypes.array.isRequired,
  movies: propTypes.array.isRequired,
};

export default MoviePage;
