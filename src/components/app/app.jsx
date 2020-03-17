import React, {PureComponent} from "react";
import propTypes from "prop-types";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {Operation as UserOperation} from "../../reducers/user/user.js";
import {getAuthorizationStatus} from "../../reducers/user/selectors.js";

class App extends PureComponent {
  render() {
    const {film, promoFilm, login, authorizationStatus} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Main
              promoFilm={promoFilm}
              login={login}
              authorizationStatus={authorizationStatus}
            />
          </Route>
          <Route exact path="/films">
            <MoviePage film={film} />
          </Route>
          <Route exact path="/login">
            {authorizationStatus === `AUTH` ? <Redirect to="/" /> : <SignIn onSubmit={login} />}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  authorizationStatus: propTypes.string.isRequired,
  login: propTypes.func.isRequired,
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

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
