import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const promoFilm = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014
};

ReactDOM.render(
    <App promoFilm={promoFilm} />,
    document.getElementById(`root`)
);
