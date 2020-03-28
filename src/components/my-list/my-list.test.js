import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import MyList from "./my-list";
import {films} from "../../test-data";

const noop = () => {};

it(`MyList component render correctly`, () => {
  const tree = renderer.create(
      <MemoryRouter>
        <MyList
          userBlock={<div></div>}
          movies={films}
          loadComments={noop}
          loadFavoriteFilms={noop}
        />
      </MemoryRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
