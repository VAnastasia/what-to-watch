import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {film, films} from "../../test-data";

const noop = () => {};

it(`Should MoviePage render correctly`, () => {
  const tree = renderer
    .create(<MoviePage
      film={film}
      movies={films}
      loadComments={() => {}}
      comments={[]}
      userBlock={<div></div>}
      authorizationStatus={`AUTH`}
      loadFilms={noop}
      loadFavoriteFilms={noop}
      changeStatusFilm={noop}
    />,
    {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
