import * as React from "react";
import * as renderer from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import MoviePage from "./movie-page";
import {film, films} from "../../test-data";
import {noop} from "../../const";

it(`Should MoviePage render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <MoviePage
            film={film}
            movies={films}
            loadComments={noop}
            comments={[]}
            userBlock={<div></div>}
            authorizationStatus={`AUTH`}
            loadFilms={noop}
            loadFavoriteFilms={noop}
            loadPromo={noop}
            changeStatusFilm={noop}
          />
        </MemoryRouter>,
        {
          createNodeMock: () => {
            return {};
          }
        })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
