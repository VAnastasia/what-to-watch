import React from "react";
import renderer from "react-test-renderer";
import ShowMore from "./show-more.jsx";

const noop = () => {};

it(`ShowMore component render correctly`, () => {
  const tree = renderer.create(
      <ShowMore
        onClick={noop}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
