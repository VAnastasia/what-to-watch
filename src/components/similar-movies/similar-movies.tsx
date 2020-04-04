import * as React from "react";
import {Link} from "react-router-dom";
import MovieCard from "../movie-card/movie-card";
import {MovieTypes} from "../../types";

interface Props {
  films: MovieTypes[];
  loadComments: () => void;
}

const SimilarMovies: React.FunctionComponent<Props> = (props: Props) => {
  const {films, loadComments} = props;
  return (
    <div className="page-content">
      {films.length > 0 && (
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__movies-list">
            {films.map((film) => {
              return (
                <MovieCard
                  key={film.id}
                  film={film}
                  loadComments={loadComments}
                />);
            })}
          </div>
        </section>
      )}
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
};

export default SimilarMovies;
