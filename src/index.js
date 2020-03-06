import React from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {Provider} from "react-redux";
import App from "./components/app/app.jsx";
import films from "./mocks/films";
import filmDetails from "./mocks/film-details";
import {reducer} from "./reducers/reducer.js";

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
);

const promoFilm = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014
};

ReactDOM.render(
    <Provider store={store}>
      <App promoFilm={promoFilm} films={films} film={filmDetails} />
    </Provider>,
    document.getElementById(`root`)
);
