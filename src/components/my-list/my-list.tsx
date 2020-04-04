import * as React from "react";
import {Link} from "react-router-dom";
import MovieCard from "../movie-card/movie-card";
import {noop} from "../../const";
import {MovieTypes} from "../../types";

type MyListProps = {
  movies: MovieTypes[];
  userBlock: React.ReactNode;
  loadFavoriteFilms: () => void;
  loadComments: () => void;
}

class MyList extends React.PureComponent<MyListProps, {}> {
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
            <Link to="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
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
                  onMovieCardHover={noop}
                  onMovieCardOut={noop}
                  isPlayer={false}
                  activeCard={-1}
                />
              );
            })}
          </div>
        </section>

        <footer className="page-footer">
          <div className="logo">
            <Link to="/" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default MyList;
