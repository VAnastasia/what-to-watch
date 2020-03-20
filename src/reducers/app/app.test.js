import {reducer, ActionTypes} from "./app.js";

const initialState = {
  genre: `All genres`,
  shownMovies: 8,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should update current state by genre value`, () => {
  expect(reducer({
    genre: `All genres`,
    shownMovies: 8
  }, {type: ActionTypes.CHANGE_GENRE, payload: `Dramas`})).toEqual({
    genre: `Dramas`,
    shownMovies: 8
  });
});

it(`Reducer should update current state by shownMovies value`, () => {
  expect(reducer({
    genre: `All genres`,
    shownMovies: 8,
  }, {type: ActionTypes.CHANGE_MOVIES_AMOUNT, payload: 16})).toEqual({
    genre: `All genres`,
    shownMovies: 16
  });
});
