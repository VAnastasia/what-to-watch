const MAX_COUNT_GENRES = 9;
const GENRE_DEFAULT = `All genres`;

const START_SHOWN_MOVIES_AMOUNT = 8;
const SHOW_MOVIES_ON_CLICK = 8;

const SIMILAR_MOVIES_AMOUNT = 4;

const MIN_LENGTH_REVIEW = 50;
const MAX_LENGTH_REVIEW = 50;

const SECONDS_IN_HOUR = 3600;
const MINUTES_IN_HOUR = 60;

const TabName = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const BASE_URL = `https://htmlacademy-react-3.appspot.com`;

const noop = () => {};


export {
  MAX_COUNT_GENRES,
  GENRE_DEFAULT,
  TabName,
  START_SHOWN_MOVIES_AMOUNT,
  SHOW_MOVIES_ON_CLICK,
  BASE_URL,
  SIMILAR_MOVIES_AMOUNT,
  AuthorizationStatus,
  MIN_LENGTH_REVIEW,
  MAX_LENGTH_REVIEW,
  SECONDS_IN_HOUR,
  MINUTES_IN_HOUR,
  noop,
};
