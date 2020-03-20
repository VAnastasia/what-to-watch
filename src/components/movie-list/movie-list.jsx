import React, {PureComponent} from "react";
import propTypes from "prop-types";
import history from "../../history.js";
import MovieCard from "../movie-card/movie-card.jsx";

class MovieList extends PureComponent {
  constructor(props) {
    super(props);
    this.handleCardHover = this.handleCardHover.bind(this);
    this.handleCardOut = this.handleCardOut.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);

    this.timer = null;

    this.state = {
      activeCard: -1,
    };
  }

  handleCardHover(id) {
    return (evt) => {
      evt.preventDefault();
      this.timer = setTimeout(() => {
        this.setState({
          activeCard: id,
        });
      }, 1000);
    };
  }

  handleCardOut() {
    clearTimeout(this.timer);
    this.setState({
      activeCard: -1,
    });
  }

  handleCardClick(id) {
    return () => history.push(`films/${id}`);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const {movies} = this.props;
    const {activeCard} = this.state;

    return (
      <div className="catalog__movies-list">
        {movies.map((film) => {
          return (
            <MovieCard
              key={film.id}
              film={film}
              onHover={this.handleCardHover}
              onLeave={this.handleCardOut}
              activeCard={activeCard}
              onMovieCardClick={this.handleCardClick(film.id)}
            />
          );
        })}
      </div>
    );
  }
}

MovieList.propTypes = {
  movies: propTypes.arrayOf(
      propTypes.object.isRequired
  ).isRequired,
};


export default MovieList;
