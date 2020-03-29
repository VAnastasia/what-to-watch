import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => {
  return state[NAME_SPACE].movies;
};

export const getFavoriteMovies = (state) => {
  return state[NAME_SPACE].favoriteMovies;
};

export const getPromo = (state) => {
  return state[NAME_SPACE].promo;
};

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};

export const getErrorMessage = (state) => {
  return state[NAME_SPACE].errorMessage;
};

export const getIsLoadMovies = (state) => {
  return state[NAME_SPACE].isLoadMovies;
};
