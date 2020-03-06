import {extend} from "../utils";
import films from "../mocks/films";
import {GENRE_DEFAULT} from "../const";


const ActionTypes = {
  SET_MOVIES: `SET_MOVIES`,
  CHANGE_GENRE: `CHANGE_GENRE`,
};

const initialState = {
  genre: GENRE_DEFAULT,
  movies: films,
};

const ActionCreator = {
  setMovies: (movies) => ({
    type: ActionTypes.SET_MOVIES,
    payload: movies
  }),

  changeGenre: (genre) => ({
    type: ActionTypes.CHANGE_GENRE,
    payload: genre
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_MOVIES:
      return extend(state, {movies: action.payload});
    case ActionTypes.CHANGE_GENRE:
      return extend(state, {genre: action.payload});
    default:
      return state;
  }
};

export {reducer, ActionTypes, ActionCreator};
