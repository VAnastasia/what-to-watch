import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import App from "./components/app/app.jsx";
import filmDetails from "./mocks/film-details";
import {reducer} from "./reducers/reducer.js";
import {Operation as DataOperation} from "./reducers/data/data";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducers/user/user";
import {createAPI} from "./api";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

store.dispatch(DataOperation.loadFilms());
store.dispatch(UserOperation.checkAuth());

const promoFilm = {
  title: `The Grand Budapest Hotel`,
  genre: `Drama`,
  year: 2014
};

ReactDOM.render(
    <Provider store={store}>
      <App promoFilm={promoFilm} film={filmDetails} />
    </Provider>,
    document.getElementById(`root`)
);
