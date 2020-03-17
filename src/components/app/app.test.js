import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import NameSpace from "../../reducers/name-space.js";
import {promoFilm, films, film} from "../../test-data";

const mockStore = configureStore([]);

it(`Should App render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      genre: `All genres`,
    },
    [NameSpace.DATA]: {
      movies: films,
      promo: promoFilm,
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            promoFilm={promoFilm}
            film={film}
            authorizationStatus={`AUTH`}
            login={() => {}}
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
