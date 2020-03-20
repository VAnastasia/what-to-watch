import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {film, films} from "../../test-data";

it(`Should MoviePage render correctly`, () => {
  const tree = renderer
    .create(<MoviePage
      film={film}
      movies={films}
      authorizationStatus={`AUTH`}
      loadComments={() => {}}
      comments={[]}
    />,
    {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
