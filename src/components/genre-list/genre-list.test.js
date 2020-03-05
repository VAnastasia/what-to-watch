import React from "react";
import renderer from "react-test-renderer";
import {GenreList} from "./genre-list.jsx";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import {films} from "../../test-data";

const mockStore = configureStore([]);

it(`Render GenreList`, () => {
  const store = mockStore({
    movies: films,
    activeGenre: `All genres`,
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <GenreList
            movies={films}
            activeGenre={`All genres`}
            changeGenre={() => {}}
          />
        </Provider>,
        {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
