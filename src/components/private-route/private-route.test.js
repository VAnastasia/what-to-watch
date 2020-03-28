import React from "react";
import renderer from "react-test-renderer";
import {PrivateRoute} from "./private-route";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {MemoryRouter} from "react-router-dom";

it(`Should render PrivateRoute component`, () => {
  const mockStore = configureStore([]);

  const store = mockStore();

  const tree = renderer
    .create(
        <Provider store={store}>
          <MemoryRouter>
            <PrivateRoute
              render={() => {}}
              path={`path`}
              exact
              authorizationStatus={`NO_AUTH`}
            />
          </MemoryRouter>
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
