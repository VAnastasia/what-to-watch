import React from "react";
import renderer from "react-test-renderer";
import UserBlock from "./user-block.jsx";

it(`UserBlock component render correctly`, () => {
  const tree = renderer.create(
      <UserBlock
        isAuth={true}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
