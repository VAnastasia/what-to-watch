import NameSpace from "../name-space.js";

const NAME_SPACE = NameSpace.DATA;

export const getMovies = (state) => {
  return state[NAME_SPACE].movies;
};

export const getPromo = (state) => {
  return state[NAME_SPACE].promo;
};

export const getComments = (state) => {
  return state[NAME_SPACE].comments;
};
