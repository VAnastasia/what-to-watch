import React from "react";
import renderer from "react-test-renderer";
import Tabs from "./tabs.jsx";
import {film} from "../../test-data";

const noop = () => {};

it(`Tabs component render correctly`, () => {
  const tree = renderer.create(
      <Tabs
        onClick={noop}
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
