import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MovieCard from "./movie-card";
import {film} from "../../test-data";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should card be hover`, () => {
  const onHover = jest.fn();
  const movieCard = shallow(
      <MovieCard
        film={film}
        onHover={onHover}
      />
  );

  movieCard.simulate(`mouseover`);

  expect(onHover.mock.calls.length).toBe(1);
});
