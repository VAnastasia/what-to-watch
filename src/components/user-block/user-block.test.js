import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";

import UserBlock from "./user-block.jsx";

it(`UserBlock component render correctly`, () => {
  const tree = renderer.create(
      <MemoryRouter>
        <UserBlock
          authorizationStatus={`AUTH`}
          avatarUrl={`avatar`}
        />
      </MemoryRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
