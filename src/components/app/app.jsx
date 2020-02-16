import React from "react";
import Main from "../main/main.jsx";
import propTypes from "prop-types";

const App = ({promoFilm, films}) => {
  return (
    <Main
      promoFilm={promoFilm}
      films={films}
    />
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
};

export default App;
