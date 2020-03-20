import React from "react";
import renderer from "react-test-renderer";
import MoviePage from "./movie-page.jsx";
import {film} from "../../test-data";

it(`Should MoviePage render correctly`, () => {
  const tree = renderer
    .create(<MoviePage
      film={film}
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
