import * as React from "react";
import * as ReactDOM from "react-dom";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import App from "./components/app/app";
import {reducer} from "./reducers/reducer";
import {Operation as DataOperation} from "./reducers/data/data";
import {Operation as UserOperation, ActionCreator, AuthorizationStatus} from "./reducers/user/user";
import {createAPI} from "./api";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH));
};

const api = createAPI(onUnauthorized);

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadFilms());
store.dispatch(DataOperation.loadPromo());
store.dispatch(UserOperation.checkAuth());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById(`root`)
);
