import React from "react";
import renderer from "react-test-renderer";
import MovieList from "./movie-list.jsx";
import {films} from "../../test-data";

it(`Should WelcomeScreen render correctly`, () => {
  const tree = renderer
    .create(<MovieList
      films={films}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
