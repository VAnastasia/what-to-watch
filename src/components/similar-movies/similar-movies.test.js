import React from "react";
import renderer from "react-test-renderer";
import SimilarMovies from "./similar-movies.jsx";
import {films} from "../../test-data";


it(`Should SimilarMovies render correctly`, () => {
  const tree = renderer
    .create(<SimilarMovies
      films={films}
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
