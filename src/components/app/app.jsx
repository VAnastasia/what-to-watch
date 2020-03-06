import React, {PureComponent} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import propTypes from "prop-types";

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      filmDetails: false,
    };
  }

  handleClick() {
    this.setState({
      filmDetails: true,
    });
  }

  _renderMainScreen() {
    const {promoFilm, film} = this.props;
    const {filmDetails} = this.state;

    if (!filmDetails) {
      return (
        <Main
          promoFilm={promoFilm}
          onClick={this.handleClick}
        />
      );
    }

    if (filmDetails) {
      return <MoviePage film={film} />;
    }

    return null;
  }

  render() {
    const {film} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainScreen()}
          </Route>
          <Route exact path="/films">
            <MoviePage film={film} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  promoFilm: propTypes.exact({
    title: propTypes.string,
    genre: propTypes.string,
    year: propTypes.number,
  }).isRequired,
  film: propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
    poster: propTypes.string.isRequired,
    genre: propTypes.string.isRequired,
    description: propTypes.string.isRequired,
    rating: propTypes.number.isRequired,
    ratingCount: propTypes.number.isRequired,
    year: propTypes.string.isRequired,
    director: propTypes.string.isRequired,
    actors: propTypes.arrayOf(propTypes.string),
  }).isRequired,
};

export default App;
