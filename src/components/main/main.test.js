import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import Main from "./main.jsx";
import NameSpace from "../../reducers/name-space.js";
import {promoFilm, films} from "../../test-data";

const mockStore = configureStore([]);

it(`Should MainScreen render correctly`, () => {
  const store = mockStore({
    [NameSpace.APP]: {
      genre: `All genres`,
      shownMovies: 8,
    },
    [NameSpace.DATA]: {
      movies: films,
      promo: promoFilm,
      comments: [],
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Main
            promoFilm={promoFilm}
            authorizationStatus={`AUTH`}
            movies={films}
            activeGenre={`All genres`}
            shownMovies={8}
            changeShownMovies={() => {}}
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
