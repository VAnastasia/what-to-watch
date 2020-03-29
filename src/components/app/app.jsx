import React from "react";
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
import MyList from "../my-list/my-list.jsx";
import {PrivateRoute} from "../private-route/private-route.jsx";
import withForm from "../../hocs/with-form/with-form.jsx";
import withPlayer from "../../hocs/with-player/with-player.jsx";
import {Operation as UserOperation, ActionCreator as ActionCreatorAuth} from "../../reducers/user/user.js";
import {Operation as DataOperation, ActionCreator} from "../../reducers/data/data.js";
import {ActionCreator as ActionCreatorApp} from "../../reducers/app/app.js";
import {getAuthorizationStatus, getAvatarUrl, getErrorMessage as getErrorAuth} from "../../reducers/user/selectors.js";
import {getMovies, getComments, getErrorMessage, getFavoriteMovies, getPromo} from "../../reducers/data/selectors.js";
import {getGenre, getShownMovies} from "../../reducers/app/selectors.js";

import {AuthorizationStatus} from "../../const";

const AddReviewWrapped = withForm(AddReview);
const FullScreenVideoPlayerWrapped = withPlayer(FullScreenVideoPlayer);

const App = (
    {
      login,
      authorizationStatus,
      avatarUrl,
      errorMessageReview,
      errorMessageAuth,
      movies,
      promo,
      favoriteMovies,
      comments,
      loadComments,
      postComment,
      deleteErrorMessage,
      deleteErrorMessageAuth,
      loadFilms,
      loadPromo,
      loadFavoriteFilms,
      changeStatusFilm,
      activeGenre,
      changeGenre,
      shownMovies,
      changeShownMovies,
    }
) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Main
            loadComments={loadComments}
            loadFilms={loadFilms}
            loadFavoriteFilms={loadFavoriteFilms}
            changeStatusFilm={changeStatusFilm}
            promo={promo}
            movies={movies}
            activeGenre={activeGenre}
            shownMovies={shownMovies}
            changeShownMovies={changeShownMovies}
            authorizationStatus={authorizationStatus}
            userBlock={<UserBlock authorizationStatus={authorizationStatus} avatarUrl={avatarUrl} />}
            genreList={<GenreList activeGenre={activeGenre} movies={movies} changeGenre={changeGenre} />}
          />
        </Route>
        <Route exact path="/films/:id"
          render={(params) => {
            const id = Number(params.match.params.id);
            const film = movies.filter((movie) => movie.id === id);
            return <MoviePage
              film={film[0]}
              comments={comments}
              loadComments={loadComments}
              loadPromo={loadPromo}
              movies={movies}
              loadFilms={loadFilms}
              loadFavoriteFilms={loadFavoriteFilms}
              changeStatusFilm={changeStatusFilm}
              authorizationStatus={authorizationStatus}
              userBlock={<UserBlock authorizationStatus={authorizationStatus} avatarUrl={avatarUrl} />}
            />;
          }} />
        <PrivateRoute
          exact
          path="/films/:id/review"
          authorizationStatus={authorizationStatus}
          render={(params) => {
            const id = Number(params.match.params.id);
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
          {authorizationStatus === AuthorizationStatus.AUTH ?
            <Redirect to="/" /> :
            <SignIn
              onSubmit={login}
              errorMessage={errorMessageAuth}
              deleteErrorMessage={deleteErrorMessageAuth}
            />}
        </Route>
        <PrivateRoute
          exact
          path="/mylist"
          authorizationStatus={authorizationStatus}
          render={() => {
            return <MyList
              userBlock={<UserBlock authorizationStatus={authorizationStatus} avatarUrl={avatarUrl} />}
              movies={favoriteMovies}
              loadComments={loadComments}
              loadFavoriteFilms={loadFavoriteFilms}
            />;
          }}
        />
        <Route exact path="/player/:id"
          render={(params) => {
            const id = Number(params.match.params.id);
            const film = movies.filter((movie) => movie.id === id);
            return <FullScreenVideoPlayerWrapped film={film[0]} />;
          }} />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  authorizationStatus: propTypes.string.isRequired,
  login: propTypes.func.isRequired,
  movies: propTypes.arrayOf(
      propTypes.shape({
        "id": propTypes.number.isRequired,
        "name": propTypes.string.isRequired,
        "poster_image": propTypes.string.isRequired,
        "preview_image": propTypes.string.isRequired,
        "background_image": propTypes.string.isRequired,
        "background_color": propTypes.string.isRequired,
        "description": propTypes.string.isRequired,
        "rating": propTypes.number.isRequired,
        "scores_count": propTypes.number.isRequired,
        "director": propTypes.string.isRequired,
        "starring": propTypes.arrayOf(propTypes.string).isRequired,
        "run_time": propTypes.number.isRequired,
        "genre": propTypes.string.isRequired,
        "released": propTypes.number.isRequired,
        "is_favorite": propTypes.bool.isRequired,
        "video_link": propTypes.string.isRequired,
        "preview_video_link": propTypes.string.isRequired,
      })
  ).isRequired,
  favoriteMovies: propTypes.arrayOf(
      propTypes.shape({
        "id": propTypes.number.isRequired,
        "name": propTypes.string.isRequired,
        "poster_image": propTypes.string.isRequired,
        "preview_image": propTypes.string.isRequired,
        "background_image": propTypes.string.isRequired,
        "background_color": propTypes.string.isRequired,
        "description": propTypes.string.isRequired,
        "rating": propTypes.number.isRequired,
        "scores_count": propTypes.number.isRequired,
        "director": propTypes.string.isRequired,
        "starring": propTypes.arrayOf(propTypes.string).isRequired,
        "run_time": propTypes.number.isRequired,
        "genre": propTypes.string.isRequired,
        "released": propTypes.number.isRequired,
        "is_favorite": propTypes.bool.isRequired,
        "video_link": propTypes.string.isRequired,
        "preview_video_link": propTypes.string.isRequired,
      })
  ).isRequired,
  activeGenre: propTypes.string.isRequired,
  changeGenre: propTypes.func.isRequired,
  comments: propTypes.arrayOf(
      propTypes.shape({
        "user": propTypes.shape({
          "id": propTypes.number.isRequired,
          "name": propTypes.string.isRequired,
        }),
        "rating": propTypes.number.isRequired,
        "comment": propTypes.string.isRequired,
        "date": propTypes.string.isRequired,
      })
  ).isRequired,
  loadComments: propTypes.func.isRequired,
  loadFilms: propTypes.func.isRequired,
  loadFavoriteFilms: propTypes.func.isRequired,
  loadPromo: propTypes.func.isRequired,
  postComment: propTypes.func.isRequired,
  avatarUrl: propTypes.string.isRequired,
  errorMessageReview: propTypes.string.isRequired,
  errorMessageAuth: propTypes.string.isRequired,
  deleteErrorMessage: propTypes.func.isRequired,
  deleteErrorMessageAuth: propTypes.func.isRequired,
  changeStatusFilm: propTypes.func.isRequired,
  promo: propTypes.shape({
    "id": propTypes.number,
    "name": propTypes.string,
    "poster_image": propTypes.string,
    "preview_image": propTypes.string,
    "background_image": propTypes.string,
    "background_color": propTypes.string,
    "description": propTypes.string,
    "rating": propTypes.number,
    "scores_count": propTypes.number,
    "director": propTypes.string,
    "starring": propTypes.arrayOf(propTypes.string),
    "run_time": propTypes.number,
    "genre": propTypes.string,
    "released": propTypes.number,
    "is_favorite": propTypes.bool,
    "video_link": propTypes.string,
    "preview_video_link": propTypes.string,
  }),
  shownMovies: propTypes.number.isRequired,
  changeShownMovies: propTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  movies: getMovies(state),
  favoriteMovies: getFavoriteMovies(state),
  comments: getComments(state),
  avatarUrl: getAvatarUrl(state),
  errorMessageReview: getErrorMessage(state),
  errorMessageAuth: getErrorAuth(state),
  activeGenre: getGenre(state),
  promo: getPromo(state),
  shownMovies: getShownMovies(state),
});

const mapDispatchToProps = (dispatch) => ({
  login: (authData) => {
    dispatch(UserOperation.login(authData));
  },
  loadFilms: () => {
    dispatch(DataOperation.loadFilms());
  },
  loadFavoriteFilms: () => {
    dispatch(DataOperation.loadFavoriteFilms());
  },
  changeStatusFilm: (id, status, onSuccess) => {
    dispatch(DataOperation.changeStatusFilm(id, status, onSuccess));
  },
  loadComments: (id) => {
    dispatch(DataOperation.loadComments(id));
  },
  postComment: (comment, id) => {
    dispatch(DataOperation.postComment(comment, id));
  },
  deleteErrorMessage: () => {
    dispatch(ActionCreator.setError(``));
  },
  deleteErrorMessageAuth: () => {
    dispatch(ActionCreatorAuth.setError(``));
  },
  loadPromo: () => {
    dispatch(DataOperation.loadPromo());
  },
  changeGenre: (genre) => {
    dispatch(ActionCreatorApp.changeGenre(genre));
  },
  changeShownMovies: (amount) => {
    dispatch(ActionCreatorApp.changeMoviesAmount(amount));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
