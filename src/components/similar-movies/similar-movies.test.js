import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import SimilarMovies from "./similar-movies.jsx";
import {films} from "../../test-data";

it(`Should SimilarMovies render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <SimilarMovies
            films={films}
            loadComments={() => {}}
          />
        </MemoryRouter>,
        {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
