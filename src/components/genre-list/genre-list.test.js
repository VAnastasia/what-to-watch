import React from "react";
import renderer from "react-test-renderer";
import {GenreList} from "./genre-list.jsx";
import {films} from "../../test-data";

it(`GenreList renders correctly`, () => {
  const tree = renderer
    .create(
        <GenreList
          activeGenre={`All genres`}
          movies={films}
          changeGenre={() => {}} />,
        {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
