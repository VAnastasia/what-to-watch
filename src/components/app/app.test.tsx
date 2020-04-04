import * as React from "react";
import * as renderer from "react-test-renderer";
import {Provider} from "react-redux";
import * as configureStore from "redux-mock-store";
import App from "./app";
import NameSpace from "../../reducers/name-space";
import {promoFilm, films} from "../../test-data";
import {noop} from "../../const";

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
      errorMessage: ``
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <App
            promo={promoFilm}
            movies={films}
            authorizationStatus={`AUTH`}
            login={noop}
            avatarUrl={`avatar`}
            errorMessageReview={`error`}
            errorMessageAuth={`error`}
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
