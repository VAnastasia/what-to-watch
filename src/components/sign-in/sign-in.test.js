import React from "react";
import renderer from "react-test-renderer";
import {MemoryRouter} from "react-router-dom";
import SignIn from "./sign-in.jsx";

const noop = () => {};

it(`SignIn component render correctly`, () => {
  const tree = renderer.create(
      <MemoryRouter>
        <SignIn
          onSubmit={noop}
          deleteErrorMessage={noop}
          errorMessage={`error`}
        />
      </MemoryRouter>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
