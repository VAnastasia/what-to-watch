import {extend} from "../utils";
// import films from "../mocks/films";
import {GENRE_DEFAULT} from "../const";


const ActionTypes = {
  SET_MOVIES: `SET_MOVIES`,
  CHANGE_GENRE: `CHANGE_GENRE`,
  LOAD_FILMS: `LOAD_FILMS`,
};

const initialState = {
  genre: GENRE_DEFAULT,
  movies: [],
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

  loadFilms: (films) => ({
    type: ActionTypes.LOAD_FILMS,
    payload: films,
  }),
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_MOVIES:
      return extend(state, {movies: action.payload});
    case ActionTypes.CHANGE_GENRE:
      return extend(state, {genre: action.payload});
    case ActionTypes.LOAD_FILMS:
      return extend(state, {movies: action.payload});
    default:
      return state;
  }
};

export {reducer, Operation, ActionTypes, ActionCreator};
