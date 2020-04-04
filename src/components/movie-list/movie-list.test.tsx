import * as React from "react";
import * as renderer from "react-test-renderer";
import MovieList from "./movie-list";
import {films} from "../../test-data";
import {noop} from "../../const";

it(`Should MovieList render correctly`, () => {
  const tree = renderer
    .create(<MovieList
      movies={films}
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
