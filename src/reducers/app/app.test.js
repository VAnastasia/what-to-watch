import {reducer, ActionTypes, ActionCreator} from "./app.js";

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

describe(`Action creators work correctly`, () => {
  it(`Action creator for require change genre returns correct action`, () => {
    expect(ActionCreator.changeGenre(`Drama`)).toEqual({
      type: ActionTypes.CHANGE_GENRE,
      payload: `Drama`,
    });
  });

  it(`Action creator for require change movies amount returns correct action`, () => {
    expect(ActionCreator.changeMoviesAmount(16)).toEqual({
      type: ActionTypes.CHANGE_MOVIES_AMOUNT,
      payload: 16,
    });
  });
});
