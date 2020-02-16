import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import propTypes from "prop-types";

const App = ({promoFilm, films, film}) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Main
            promoFilm={promoFilm}
            films={films}
          />
        </Route>
        <Route exact path="/films">
          <MoviePage film={film} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  films: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    title: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
  })).isRequired,
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
