class Movie {
  constructor(film) {
    this.id = film.id;
    this.title = film.name;
    this.backgroundImage = film.background_image;
    this.backgroundColor = film.background_color;
    this.posterImage = film.poster_image;
    this.previewImage = film.preview_image;
    this.genre = film.genre;
    this.year = film.released;
    this.isFavorite = film.is_favorite;
    this.videoPreview = film.preview_video_link;
    this.video = film.video_link;
    this.description = film.description;
    this.rating = film.rating;
    this.scores = film.scores_count;
    this.director = film.director;
    this.actors = film.starring;
    this.runTime = film.run_time;
  }
}

export default Movie;
