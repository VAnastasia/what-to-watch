import React from "react";
import renderer from "react-test-renderer";
import UserBlock from "./user-block.jsx";

it(`UserBlock component render correctly`, () => {
  const tree = renderer.create(
      <UserBlock
        authorizationStatus={`AUTH`}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
