import React from "react";
import renderer from "react-test-renderer";
import MovieCard from "./movie-card.jsx";
import {film} from "../../test-data";

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(<MovieCard
      film={film}
      onMovieCardHover={() => {}}
      onMovieCardOut={() => {}}
      activeCard={film.id}
      loadComments={() => {}}
    />,
    {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
