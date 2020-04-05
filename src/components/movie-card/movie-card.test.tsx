import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieCard from "./movie-card";
import {film} from "../../test-data";
import {noop} from "../../const";

it(`Should MovieCard render correctly`, () => {
  const tree = renderer
    .create(<MovieCard
      film={film}
      onMovieCardHover={noop}
      onMovieCardOut={noop}
      activeCard={film.id}
      loadComments={noop}
    />,
    {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
