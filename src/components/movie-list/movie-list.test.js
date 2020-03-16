import React from "react";
import renderer from "react-test-renderer";
import {MovieList} from "./movie-list.jsx";
import {films} from "../../test-data";

it(`Should MovieList render correctly`, () => {
  const tree = renderer
    .create(<MovieList
      movies={films}
      activeGenre={`All genres`}
    />,
    {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
