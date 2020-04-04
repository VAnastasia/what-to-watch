import * as React from "react";
import MovieCard from "../movie-card/movie-card";
import withActiveCard from "../../hocs/with-active-card/with-active-card";
import {MovieTypes} from "../../types";

interface Props {
  movies: MovieTypes[];
  loadComments: () => void;
}

const MovieCardWrapped = withActiveCard(MovieCard);

const MovieList: React.FunctionComponent<Props> = (props: Props) => {
  const {movies, loadComments} = props;
  return (
    <div className="catalog__movies-list">
      {movies.map((film) => {
        return (
          <MovieCardWrapped
            key={film.id}
            film={film}
            loadComments={loadComments}
          />
        );
      })}
    </div>
  );
};

export default MovieList;
