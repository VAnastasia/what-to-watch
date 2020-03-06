import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import {promoFilm, films, film} from "../../test-data";

const mockStore = configureStore([]);

it(`Should App render correctly`, () => {
  const store = mockStore({
    genre: `All genres`,
    movies: films,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            promoFilm={promoFilm}
            film={film}
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
