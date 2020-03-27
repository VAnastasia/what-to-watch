import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import App from "./app.jsx";
import NameSpace from "../../reducers/name-space.js";
import {promoFilm, films} from "../../test-data";

const mockStore = configureStore([]);

it(`Should App render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      genre: `All genres`,
      shownMovies: 8,
    },
    [NameSpace.DATA]: {
      movies: films,
      promo: promoFilm,
      comments: [],
      errorMessage: ``,
      favoriteMovies: [],
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
      avatarUrl: `avatar`,
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            promo={promoFilm}
            movies={films}
            authorizationStatus={`AUTH`}
            login={() => {}}
            avatarUrl={`avatar`}
            errorMessageReview={`error`}
            favoriteMovies={[]}
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
