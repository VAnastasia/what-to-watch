import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {promoFilm, films} from "../../test-data";

it(`Should WelcomeScreen render correctly`, () => {
  const tree = renderer
    .create(<Main
      promoFilm={promoFilm}
      films={films}
      onTitleClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
