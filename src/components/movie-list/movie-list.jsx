import React, {PureComponent} from "react";
import propTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

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

  render() {
    const {films, onClick} = this.props;
    const {activeCard} = this.state;

    return (
      <div className="catalog__movies-list">
        {films.map((film, index) => {
          return (
            <MovieCard
              key={index}
              film={film}
              onHover={this.handleCardHover}
              onLeave={this.handleCardOut}
              onClick={onClick}
              activeCard={activeCard}
            />
          );
        })}
      </div>
    );
  }
}

MovieList.propTypes = {
  films: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
    video: propTypes.string.isRequired,
  })).isRequired,
  onClick: propTypes.func.isRequired,
};

export default MovieList;
