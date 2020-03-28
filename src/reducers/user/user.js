import {BASE_URL, AuthorizationStatus} from "../../const";
import history from "../../history";

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  avatarUrl: ``,
  errorMessage: ``,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  LOAD_AVATAR: `LOAD_AVATAR`,
  SET_ERROR: `SET_ERROR`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  loadAvatar: (avatar) => {
    return {
      type: ActionType.LOAD_AVATAR,
      payload: avatar,
    };
  },
  setError: (error) => {
    return {
      type: ActionType.SET_ERROR,
      payload: error,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });
    case ActionType.LOAD_AVATAR:
      return Object.assign({}, state, {
        avatarUrl: action.payload,
      });
    case ActionType.SET_ERROR:
      return Object.assign({}, state, {
        errorMessage: action.payload,
      });
  }

  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.loadAvatar(BASE_URL + response.data.avatar_url));
      })
      .catch((err) => {
        throw err;
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.loadAvatar(BASE_URL + response.data.avatar_url));
        history.goBack();
      })
      .catch((error) => {
        dispatch(ActionCreator.setError(error.response.data.error));
      });
  },
};

export {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer,
};
