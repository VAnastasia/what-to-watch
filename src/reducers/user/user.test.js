import {reducer, ActionCreator, ActionType, AuthorizationStatus} from "./user.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    avatarUrl: ``,
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    avatarUrl: ``,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: ``,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: ``,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    avatarUrl: ``,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: ``,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: ``,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    avatarUrl: ``,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    avatarUrl: ``,
  });
});

it(`Reducer should change errorMessage by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: ``,
  }, {
    type: ActionType.LOAD_AVATAR,
    payload: `avatar`,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: `avatar`,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
    });
  });
});
