import {reducer, ActionTypes} from "./app.js";

const initialState = {
  genre: `All genres`,
};

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

it(`Reducer should update current state by value`, () => {
  expect(reducer({
    genre: `All genres`,
  }, {type: ActionTypes.CHANGE_GENRE, payload: `Dramas`})).toEqual({
    genre: `Dramas`,
  });
});
