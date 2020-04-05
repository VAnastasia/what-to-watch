import * as React from "react";
import {shallow, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";
import {film} from "../../test-data";

configure({
  adapter: new Adapter(),
});

it(`Should card be hover, leave, click`, () => {
  const onMovieCardHover = jest.fn();
  const loadComments = jest.fn();
  const onMovieCardOut = jest.fn();

  const movieCard = shallow(
      <MovieCard
        film={film}
        onMovieCardHover={onMovieCardHover}
        onMovieCardOut={onMovieCardOut}
        activeCard={1}
        loadComments={loadComments}
      />
  );

  movieCard.simulate(`mouseover`);
  movieCard.simulate(`click`);
  movieCard.simulate(`mouseleave`);
  expect(onMovieCardHover.mock.calls.length).toBe(1);
  expect(loadComments.mock.calls.length).toBe(1);
  expect(onMovieCardOut.mock.calls.length).toBe(1);
});
