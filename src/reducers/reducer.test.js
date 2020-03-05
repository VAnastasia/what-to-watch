import {reducer, ActionTypes} from "./reducer.js";
import {films} from "../test-data";

const initialState = {
  genre: `All genres`,
  movies: films,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should update current state by value`, () => {
  expect(reducer(initialState, {type: ActionTypes.SET_MOVIES, payload: films})).toEqual({
    genre: `All genres`,
    movies: films,
  });

  expect(reducer({
    genre: `All genres`,
    movies: films,
  }, {type: ActionTypes.CHANGE_GENRE, payload: `Dramas`})).toEqual({
    genre: `Dramas`,
    movies: films,
  });
});
