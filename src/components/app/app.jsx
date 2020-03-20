import React, {PureComponent} from "react";
import propTypes from "prop-types";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import history from "../../history.js";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {Operation as UserOperation} from "../../reducers/user/user.js";
import {Operation as DataOperation} from "../../reducers/data/data.js";
import {getAuthorizationStatus} from "../../reducers/user/selectors.js";
import {getPromo, getMovies, getComments} from "../../reducers/data/selectors.js";

class App extends PureComponent {
  render() {
    const {promo, login, authorizationStatus, movies, comments, loadComments} = this.props;
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Main
              promoFilm={promo}
              login={login}
              authorizationStatus={authorizationStatus}
            />
          </Route>
          <Route exact path="/films/:id"
            render={(props) => {
              const id = Number(props.match.params.id);
              const film = movies.filter((movie) => movie.id === id);
              return <MoviePage
                film={film[0]}
                isAuth={authorizationStatus === `AUTH`}
                comments={comments}
                loadComments={loadComments}
              />;
            }} />
          <Route exact path="/login">
            {authorizationStatus === `AUTH` ? <Redirect to="/" /> : <SignIn onSubmit={login} />}
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  authorizationStatus: propTypes.string.isRequired,
  login: propTypes.func.isRequired,
  promo: propTypes.object.isRequired,
  movies: propTypes.arrayOf(
      propTypes.object.isRequired
  ).isRequired,
  comments: propTypes.array.isRequired,
  loadComments: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  promo: getPromo(state),
  movies: getMovies(state),
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  loadComments(id) {
    dispatch(DataOperation.loadComments(id));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
