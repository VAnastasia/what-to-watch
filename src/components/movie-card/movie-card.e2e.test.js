import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";
import {film} from "../../test-data";

const noop = () => {};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should card be hover`, () => {
  const onMovieCardHover = jest.fn();

  const movieCard = shallow(
      <MovieCard
        film={film}
        onMovieCardHover={onMovieCardHover}
        onMovieCardOut={noop}
        activeCard={1}
        loadComments={noop}
      />
  );

  movieCard.simulate(`mouseover`);
  expect(onMovieCardHover.mock.calls.length).toBe(1);
});

it(`Should card be hover`, () => {
  const loadComments = jest.fn();

  const movieCard = shallow(
      <MovieCard
        film={film}
        onMovieCardHover={noop}
        onLeave={noop}
        activeCard={1}
        loadComments={loadComments}
      />
  );

  movieCard.simulate(`click`);
  expect(loadComments.mock.calls.length).toBe(1);
});

it(`Should card be hover`, () => {
  const onMovieCardOut = jest.fn();

  const movieCard = shallow(
      <MovieCard
        film={film}
        onMovieCardHover={noop}
        onMovieCardOut={onMovieCardOut}
        activeCard={1}
        loadComments={noop}
      />
  );

  movieCard.simulate(`mouseleave`);
  expect(onMovieCardOut.mock.calls.length).toBe(1);
});

