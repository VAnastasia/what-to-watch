import {SECONDS_IN_HOUR, MINUTES_IN_HOUR} from "./const";

const RatingLevel = {
  BAD: 0,
  NORMAL: 3,
  GOOD: 5,
  VERY_GOOD: 8,
  AWESOME: 10
};

const defineLevelFilm = (rating) => {
  if (rating >= RatingLevel.BAD && rating < RatingLevel.NORMAL) {
    return `Bad`;
  }

  if (rating >= RatingLevel.NORMAL && rating < RatingLevel.GOOD) {
    return `Normal`;
  }

  if (rating >= RatingLevel.GOOD && rating < RatingLevel.VERY_GOOD) {
    return `Good`;
  }

  if (rating >= RatingLevel.VERY_GOOD && rating < RatingLevel.AWESOME) {
    return `Very good`;
  }

  if (rating === RatingLevel.AWESOME) {
    return `Awesome`;
  }

  return ``;
};

const fixNumber = (number, decimalPoint) => {
  return number.toFixed(decimalPoint);
};

const extend = (a, b) => {
  return Object.assign({}, a, b);
};

const getRuntime = (minutes) => {
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};

const dateFormat = new Intl.DateTimeFormat(`en-US`, {
  month: `long`,
  day: `numeric`,
  year: `numeric`
});

const formatDate = (date) => dateFormat.format(date);

const formatTime = (time) => {
  const hours = Math.floor(time / SECONDS_IN_HOUR);
  const minutes = Math.floor((time % SECONDS_IN_HOUR) / MINUTES_IN_HOUR);
  const seconds = Math.floor(time % MINUTES_IN_HOUR);
  return [
    hours.toString().padStart(2, `0`),
    minutes.toString().padStart(2, `0`),
    seconds.toString().padStart(2, `0`)
  ].join(`:`);
};

export {defineLevelFilm, fixNumber, extend, getRuntime, formatDate, formatTime};
