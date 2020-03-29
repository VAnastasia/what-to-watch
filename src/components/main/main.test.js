import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {MemoryRouter} from "react-router-dom";
import Main from "./main.jsx";
import NameSpace from "../../reducers/name-space.js";
import {promoFilm, films} from "../../test-data";

const mockStore = configureStore([]);
const noop = () => {};

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
      favoriteMovies: [],
    },
    [NameSpace.USER]: {
      authorizationStatus: `AUTH`,
    }
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <MemoryRouter>
            <Main
              promo={promoFilm}
              authorizationStatus={`AUTH`}
              movies={films}
              activeGenre={`All genres`}
              shownMovies={8}
              changeShownMovies={noop}
              userBlock={<div></div>}
              genreList={<div></div>}
              loadFilms={noop}
              loadFavoriteFilms={noop}
              changeStatusFilm={noop}
              loadComments={noop}
            />
          </MemoryRouter>
        </Provider>,
        {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
