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

export {defineLevelFilm};
