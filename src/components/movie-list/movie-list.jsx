import React, {PureComponent} from "react";
import propTypes from "prop-types";
import MovieCard from "../movie-card/movie-card.jsx";

class MovieList extends PureComponent {
  constructor(props) {
    super(props);
    this.handleCardHover = this.handleCardHover.bind(this);

    this.state = {
      activeCard: null,
    };
  }

  handleCardHover(evt) {
    evt.preventDefault();
    this.setState({
      activeCard: evt.target.parentNode.dataset.id,
    });
  }

  render() {
    const {films} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.map((film, index) => {
          return <MovieCard film={film} onHover={this.handleCardHover} key={index} />;
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
  })).isRequired,
};

export default MovieList;
