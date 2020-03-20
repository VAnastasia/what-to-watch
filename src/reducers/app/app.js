import {extend} from "../../utils";
import {GENRE_DEFAULT, START_SHOWN_MOVIES_AMOUNT} from "../../const";

const ActionTypes = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  CHANGE_MOVIES_AMOUNT: `CHANGE_MOVIES_AMOUNT`,
};

const initialState = {
  genre: GENRE_DEFAULT,
  shownMovies: START_SHOWN_MOVIES_AMOUNT,
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionTypes.CHANGE_GENRE,
    payload: genre
  }),
  changeMoviesAmount: (amount) => ({
    type: ActionTypes.CHANGE_MOVIES_AMOUNT,
    payload: amount
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_GENRE:
      return extend(state, {genre: action.payload});
    case ActionTypes.CHANGE_MOVIES_AMOUNT:
      return extend(state, {shownMovies: action.payload});
    default:
      return state;
  }
};

export {reducer, ActionTypes, ActionCreator};
