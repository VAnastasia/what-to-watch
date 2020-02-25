import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";
import {promoFilm, films} from "../../test-data";

it(`Should MainScreen render correctly`, () => {
  const tree = renderer
    .create(<Main
      promoFilm={promoFilm}
      films={films}
      onClick={() => {}}
    />,
    {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
