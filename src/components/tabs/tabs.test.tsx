import * as React from "react";
import * as renderer from "react-test-renderer";
import Tabs from "./tabs";
import {film} from "../../test-data";
import {noop} from "../../const";

it(`Tabs component render correctly`, () => {
  const tree = renderer.create(
      <Tabs
        onClick={noop}
        loadComments={noop}
        activeTab={`Overview`}
        film={film}
        comments={[]}
      />,
      {
        createNodeMock: () => {
          return {};
        }
      }
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
