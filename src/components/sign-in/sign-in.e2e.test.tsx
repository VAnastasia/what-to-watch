import * as React from "react";
import {mount, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {MemoryRouter} from "react-router-dom";
import SignIn from "./sign-in";
import {noop} from "../../const";

configure({
  adapter: new Adapter(),
});

it(`Should SignIn be submit`, () => {
  const onSubmit = jest.fn();

  const signIn = mount(
      <MemoryRouter>
        <SignIn
          onSubmit={onSubmit}
          deleteErrorMessage={noop}
          errorMessage={`error`}
        />
      </MemoryRouter>
  );

  signIn.find(`form`).simulate(`submit`);
  expect(onSubmit.mock.calls.length).toBe(1);
});
