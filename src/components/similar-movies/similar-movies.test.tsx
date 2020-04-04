import * as React from "react";
import * as renderer from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import SimilarMovies from "./similar-movies";
import {films} from "../../test-data";
import {noop} from "../../const";

it(`Should SimilarMovies render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <SimilarMovies
            films={films}
            loadComments={noop}
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
