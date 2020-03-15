import React, {PureComponent} from "react";
import propTypes from "prop-types";
import {connect} from 'react-redux';
import MovieCard from "../movie-card/movie-card.jsx";
import {GENRE_DEFAULT} from "../../const";

class MovieList extends PureComponent {
  constructor(props) {
    super(props);
    this.handleCardHover = this.handleCardHover.bind(this);
    this.handleCardOut = this.handleCardOut.bind(this);
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

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  getFiltredMovies(movies, activeGenre) {
    if (activeGenre !== GENRE_DEFAULT) {
      return movies.slice().filter((movie) => movie.genre === activeGenre);
    }
    return movies;
  }

  render() {
    const {movies, activeGenre} = this.props;
    const {activeCard} = this.state;
    const films = this.getFiltredMovies(movies, activeGenre);

    return (
      <div className="catalog__movies-list">
        {films.map((film, index) => {
          return (
            <MovieCard
              key={index}
              film={film}
              onHover={this.handleCardHover}
              onLeave={this.handleCardOut}
              activeCard={activeCard}
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
  activeGenre: propTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  activeGenre: state.genre
});

export {MovieList};
export default connect(mapStateToProps)(MovieList);
