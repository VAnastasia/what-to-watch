import {extend} from "../../utils";

const ActionTypes = {
  LOAD_FILMS: `LOAD_FILMS`,
};

const initialState = {
  movies: [],
};

const ActionCreator = {
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
    case ActionTypes.LOAD_FILMS:
      return extend(state, {movies: action.payload});
    default:
      return state;
  }
};

export {reducer, Operation, ActionTypes, ActionCreator};
