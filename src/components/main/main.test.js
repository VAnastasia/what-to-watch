import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import {promoFilm, films} from "../../test-data";

const mockStore = configureStore([]);

it(`Should MainScreen render correctly`, () => {
  const store = mockStore({
    genre: `All genres`,
    movies: films,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            promoFilm={promoFilm}
          />
        </Provider>,
        {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
