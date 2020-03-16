import {extend} from "../../utils";
import {GENRE_DEFAULT} from "../../const";

const ActionTypes = {
  CHANGE_GENRE: `CHANGE_GENRE`,
};

const initialState = {
  genre: GENRE_DEFAULT,
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionTypes.CHANGE_GENRE,
    payload: genre
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CHANGE_GENRE:
      return extend(state, {genre: action.payload});
    default:
      return state;
  }
};

export {reducer, ActionTypes, ActionCreator};
