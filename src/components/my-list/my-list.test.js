import React from "react";
import renderer from "react-test-renderer";
import MyList from "./my-list";
import {films} from "../../test-data";

const noop = () => {};

it(`MyList component render correctly`, () => {
  const tree = renderer.create(
      <MyList
        userBlock={<div></div>}
        movies={films}
        loadComments={noop}
        loadFavoriteFilms={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
