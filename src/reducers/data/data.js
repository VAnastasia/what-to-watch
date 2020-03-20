import {extend} from "../../utils";

const ActionTypes = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO: `LOAD_PROMO`,
  LOAD_COMMENTS: `LOAD_COMMENTS`,
};

const initialState = {
  movies: [],
  promo: {},
  comments: [],
};

const ActionCreator = {
  loadFilms: (films) => ({
    type: ActionTypes.LOAD_FILMS,
    payload: films,
  }),
  loadPromo: (promo) => ({
    type: ActionTypes.LOAD_PROMO,
    payload: promo,
  }),
  loadComments: (comments) => ({
    type: ActionTypes.LOAD_COMMENTS,
    payload: comments,
  })
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data));
      });
  },
  loadPromo: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromo(response.data));
      });
  },
  loadComments: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`)
      .then((response) => {
        dispatch(ActionCreator.loadComments(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_FILMS:
      return extend(state, {movies: action.payload});
    case ActionTypes.LOAD_PROMO:
      return extend(state, {promo: action.payload});
    case ActionTypes.LOAD_COMMENTS:
      return extend(state, {comments: action.payload});
    default:
      return state;
  }
};

export {reducer, Operation, ActionTypes, ActionCreator};
