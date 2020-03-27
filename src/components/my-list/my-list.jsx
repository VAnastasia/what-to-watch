import React, {PureComponent} from "react";
import propTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MyList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadFavoriteFilms();
  }

  render() {
    const {userBlock, movies, loadComments} = this.props;
    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <a href="main.html" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <h1 className="page-title user-page__title">My list</h1>

          {userBlock}
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <div className="catalog__movies-list">
            {movies.map((film) => {
              return (
                <MovieCard
                  key={film.id}
                  film={film}
                  loadComments={loadComments}
                  onMovieCardHover={() => {}}
                  onMovieCardOut={() => {}}
                  isPlayer={false}
                  activeCard={-1}
                />
              );
            })}
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
      </div>
    );
  }
}

MyList.propTypes = {
  userBlock: propTypes.oneOfType([
    propTypes.arrayOf(propTypes.node),
    propTypes.node
  ]).isRequired,
  movies: propTypes.array.isRequired,
  loadComments: propTypes.func.isRequired,
  loadFavoriteFilms: propTypes.func.isRequired,
};

export default MyList;
