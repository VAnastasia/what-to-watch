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
  const onHover = jest.fn();

  const movieCard = shallow(
      <MovieCard
        film={film}
        onHover={onHover}
        onLeave={noop}
        activeCard={1}
        loadComments={noop}
      />
  );

  movieCard.simulate(`mouseover`);
  expect(onHover.mock.calls.length).toBe(1);
});

it(`Should card be hover`, () => {
  const loadComments = jest.fn();

  const movieCard = shallow(
      <MovieCard
        film={film}
        onHover={noop}
        onLeave={noop}
        activeCard={1}
        loadComments={loadComments}
      />
  );

  movieCard.simulate(`click`);
  expect(loadComments.mock.calls.length).toBe(1);
});

it(`Should card be hover`, () => {
  const onLeave = jest.fn();

  const movieCard = shallow(
      <MovieCard
        film={film}
        onHover={noop}
        onLeave={onLeave}
        activeCard={1}
        loadComments={noop}
      />
  );

  movieCard.simulate(`mouseleave`);
  expect(onLeave.mock.calls.length).toBe(1);
});

