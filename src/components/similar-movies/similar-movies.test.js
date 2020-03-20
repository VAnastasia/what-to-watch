import React from "react";
import renderer from "react-test-renderer";
import SimilarMovies from "./similar-movies.jsx";
import {films} from "../../test-data";

const noop = () => {};

it(`Should SimilarMovies render correctly`, () => {
  const tree = renderer
    .create(<SimilarMovies
      films={films}
      activeCard={0}
      onClick={noop}
    />,
    {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
