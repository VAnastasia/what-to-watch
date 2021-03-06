import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.USER;

export const getAuthorizationStatus = (state) => {
  return state[NAME_SPACE].authorizationStatus;
};

export const getAvatarUrl = (state) => {
  return state[NAME_SPACE].avatarUrl;
};

export const getErrorMessage = (state) => {
  return state[NAME_SPACE].errorMessage;
};
