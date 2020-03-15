import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import App from "./components/app/app.jsx";
import films from "./mocks/films";
import filmDetails from "./mocks/film-details";
import {reducer, Operation} from "./reducers/reducer.js";
import {createAPI} from "./api";

const onUnauthorized = () => {
  // store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(Operation.loadFilms());

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
