import {reducer, ActionCreator, ActionType, AuthorizationStatus} from "./user.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    avatarUrl: ``,
    errorMessage: ``,
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    avatarUrl: ``,
    errorMessage: ``,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: ``,
    errorMessage: ``,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: ``,
    errorMessage: ``,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    avatarUrl: ``,
    errorMessage: ``,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: ``,
    errorMessage: ``,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: ``,
    errorMessage: ``,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    avatarUrl: ``,
    errorMessage: ``,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    avatarUrl: ``,
    errorMessage: ``,
  });
});

it(`Reducer should change avatarUser by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: ``,
    errorMessage: ``,
  }, {
    type: ActionType.LOAD_AVATAR,
    payload: `avatar`,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: `avatar`,
    errorMessage: ``,
  });
});

it(`Reducer should change errorMessage by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: `avatar`,
    errorMessage: ``,
  }, {
    type: ActionType.SET_ERROR,
    payload: `error`,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
    avatarUrl: `avatar`,
    errorMessage: `error`,
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

  it(`Action creator for require avatar returns correct action`, () => {
    expect(ActionCreator.loadAvatar(`avatar`)).toEqual({
      type: ActionType.LOAD_AVATAR,
      payload: `avatar`,
    });
  });

  it(`Action creator for require errorMessage returns correct action`, () => {
    expect(ActionCreator.setError(`error`)).toEqual({
      type: ActionType.SET_ERROR,
      payload: `error`,
    });
  });
});
