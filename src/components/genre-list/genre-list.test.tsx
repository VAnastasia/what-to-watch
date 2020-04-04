import * as React from "react";
import * as renderer from "react-test-renderer";
import GenreList from "./genre-list";
import {films} from "../../test-data";
import {noop} from "../../const";

it(`GenreList renders correctly`, () => {
  const tree = renderer
    .create(
        <GenreList
          activeGenre={`All genres`}
          movies={films}
          changeGenre={noop}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
