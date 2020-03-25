import React, {PureComponent} from "react";
import propTypes from "prop-types";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import history from "../../history.js";
import {connect} from "react-redux";
import Main from "../main/main.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import AddReview from "../add-review/add-review.jsx";
import UserBlock from "../user-block/user-block.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import FullScreenVideoPlayer from "../full-screen-video-player/full-screen-video-player.jsx";
import withForm from "../../hocs/with-form/with-form.jsx";
import withPlayer from "../../hocs/with-player/with-player.jsx";
import {Operation as UserOperation} from "../../reducers/user/user.js";
import {Operation as DataOperation, ActionCreator} from "../../reducers/data/data.js";
import {getAuthorizationStatus, getAvatarUrl} from "../../reducers/user/selectors.js";
import {getPromo, getMovies, getComments, getErrorMessage} from "../../reducers/data/selectors.js";

const AddReviewWrapped = withForm(AddReview);
const FullScreenVideoPlayerWrapped = withPlayer(FullScreenVideoPlayer);

class App extends PureComponent {
  render() {
    const {
      promo,
      login,
      authorizationStatus,
      avatarUrl,
      errorMessageReview,
      movies,
      comments,
      loadComments,
      postComment,
      deleteErrorMessage,
    } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/">
            <Main
              promoFilm={promo}
              login={login}
              userBlock={<UserBlock authorizationStatus={authorizationStatus} avatarUrl={avatarUrl} />}
              genreList={<GenreList />}
            />
          </Route>
          <Route exact path="/films/:id"
            render={(props) => {
              const id = Number(props.match.params.id);
              const film = movies.filter((movie) => movie.id === id);
              return <MoviePage
                film={film[0]}
                comments={comments}
                loadComments={loadComments}
                movies={movies}
                authorizationStatus={authorizationStatus}
                userBlock={<UserBlock authorizationStatus={authorizationStatus} avatarUrl={avatarUrl} />}
              />;
            }} />
          <Route exact path="/films/:id/review"
            render={(props) => {
              const id = Number(props.match.params.id);
              const film = movies.filter((movie) => movie.id === id);
              return <AddReviewWrapped
                film={film[0]}
                userBlock={<UserBlock authorizationStatus={authorizationStatus} avatarUrl={avatarUrl} />}
                onSubmit={postComment}
                errorMessage={errorMessageReview}
                deleteErrorMessage={deleteErrorMessage}
              />;
            }} />
          <Route exact path="/login">
            {authorizationStatus === `AUTH` ? <Redirect to="/" /> : <SignIn onSubmit={login} />}
          </Route>
          <Route exact path="/player/:id"
            render={(props) => {
              const id = Number(props.match.params.id);
              const film = movies.filter((movie) => movie.id === id);
              return <FullScreenVideoPlayerWrapped film={film[0]} />;
            }} />
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
  postComment: propTypes.func.isRequired,
  avatarUrl: propTypes.string.isRequired,
  errorMessageReview: propTypes.string.isRequired,
  deleteErrorMessage: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  promo: getPromo(state),
  movies: getMovies(state),
  comments: getComments(state),
  avatarUrl: getAvatarUrl(state),
  errorMessageReview: getErrorMessage(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  loadComments(id) {
    dispatch(DataOperation.loadComments(id));
  },
  postComment(comment, id) {
    dispatch(DataOperation.postComment(comment, id));
  },
  deleteErrorMessage() {
    dispatch(ActionCreator.setError(``));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
