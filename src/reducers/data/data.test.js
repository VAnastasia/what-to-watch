import MockAdapter from "axios-mock-adapter";
import {createAPI} from "../../api.js";
import {reducer, ActionTypes, Operation} from "./data.js";
import {films, promoFilm} from "../../test-data";

const api = createAPI(() => {});

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    movies: [],
    promo: {},
  });
});

it(`Reducer should change movies by a given value`, () => {
  expect(reducer({
    movies: [],
    promo: {},
  }, {
    type: ActionTypes.LOAD_FILMS,
    payload: films,
  })).toEqual({
    movies: films,
    promo: {},
  });
});

it(`Reducer should change promo by a given value`, () => {
  expect(reducer({
    movies: films,
    promo: {},
  }, {
    type: ActionTypes.LOAD_PROMO,
    payload: promoFilm,
  })).toEqual({
    movies: films,
    promo: promoFilm,
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
});
