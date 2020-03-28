import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionTypes, Operation} from "./data.js";
import {films, promoFilm} from "../../test-data";

const comments = [];

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    movies: [],
    promo: {},
    comments: [],
    errorMessage: ``,
    favoriteMovies: [],
  });
});

it(`Reducer should change movies by a given value`, () => {
  expect(reducer({
    movies: [],
    promo: {},
    comments: [],
    errorMessage: ``,
    favoriteMovies: [],
  }, {
    type: ActionTypes.LOAD_FILMS,
    payload: films,
  })).toEqual({
    movies: films,
    promo: {},
    comments: [],
    errorMessage: ``,
    favoriteMovies: [],
  });
});

it(`Reducer should change promo by a given value`, () => {
  expect(reducer({
    movies: films,
    promo: {},
    comments: [],
    errorMessage: ``,
    favoriteMovies: [],
  }, {
    type: ActionTypes.LOAD_PROMO,
    payload: promoFilm,
  })).toEqual({
    movies: films,
    promo: promoFilm,
    comments: [],
    errorMessage: ``,
    favoriteMovies: [],
  });
});

it(`Reducer should change comments by a given value`, () => {
  expect(reducer({
    movies: films,
    promo: promoFilm,
    comments: [],
    errorMessage: ``,
    favoriteMovies: [],
  }, {
    type: ActionTypes.LOAD_COMMENTS,
    payload: comments,
  })).toEqual({
    movies: films,
    promo: promoFilm,
    comments: [],
    errorMessage: ``,
    favoriteMovies: [],
  });
});

it(`Reducer should change errorMessage by a given value`, () => {
  expect(reducer({
    movies: films,
    promo: promoFilm,
    comments: [],
    errorMessage: ``,
    favoriteMovies: [],
  }, {
    type: ActionTypes.SET_ERROR,
    payload: `error`,
  })).toEqual({
    movies: films,
    promo: promoFilm,
    comments: [],
    errorMessage: `error`,
    favoriteMovies: [],
  });
});

describe(`Operation work correctly`, () => {
  it(`Should make a correct API call to /films`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const filmLoader = Operation.loadFilms();

    apiMock
      .onGet(`/films`)
      .reply(200, [{fake: true}]);

    return filmLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.LOAD_FILMS,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /films/promo`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const promoLoader = Operation.loadPromo();

    apiMock
      .onGet(`/films/promo`)
      .reply(200, [{fake: true}]);

    return promoLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.LOAD_PROMO,
          payload: [{fake: true}],
        });
      });
  });

  it(`Should make a correct API call to /comments/1`, function () {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const commentsLoader = Operation.loadComments(1);

    apiMock
      .onGet(`/comments/1`)
      .reply(200, [{fake: true}]);

    return commentsLoader(dispatch, () => {}, api)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenNthCalledWith(1, {
          type: ActionTypes.LOAD_COMMENTS,
          payload: [{fake: true}],
        });
      });
  });
});
