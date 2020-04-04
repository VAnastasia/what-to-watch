import * as React from "react";
import * as renderer from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import UserBlock from "./user-block";

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
