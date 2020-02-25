import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";
import {promoFilm, films, film} from "../../test-data";

it(`Should App render correctly`, () => {
  const tree = renderer
    .create(<App
      promoFilm={promoFilm}
      films={films}
      film={film}
    />,
    {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
