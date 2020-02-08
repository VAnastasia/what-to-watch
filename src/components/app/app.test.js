import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {promoFilm, films} from "../../testData";

it(`Should WelcomeScreen render correctly`, () => {
  const tree = renderer
    .create(<App
      promoFilm={promoFilm}
      films={films}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
