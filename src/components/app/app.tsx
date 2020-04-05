import * as React from "react";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import history from "../../history";
import {connect} from "react-redux";
import Main from "../main/main";
import MoviePage from "../movie-page/movie-page";
import SignIn from "../sign-in/sign-in";
import AddReview from "../add-review/add-review";
import UserBlock from "../user-block/user-block";
import GenreList from "../genre-list/genre-list";
import FullScreenVideoPlayer from "../full-screen-video-player/full-screen-video-player";
import MyList from "../my-list/my-list";
import {PrivateRoute} from "../private-route/private-route";
import withForm from "../../hocs/with-form/with-form";
import withPlayer from "../../hocs/with-player/with-player";
import {Operation as UserOperation, ActionCreator as ActionCreatorAuth} from "../../reducers/user/user";
import {Operation as DataOperation, ActionCreator} from "../../reducers/data/data";
import {ActionCreator as ActionCreatorApp} from "../../reducers/app/app";
import {getAuthorizationStatus, getAvatarUrl, getErrorMessage as getErrorAuth} from "../../reducers/user/selectors";
import {getMovies, getComments, getErrorMessage, getFavoriteMovies, getPromo} from "../../reducers/data/selectors";
import {getGenre, getShownMovies} from "../../reducers/app/selectors";
import {AuthorizationStatus} from "../../const";
import {MovieTypes, CommentTypes} from "../../types";

interface Props {
  login: (
    {login, password}: { login: string; password: string }
  ) => void;
  authorizationStatus: string;
  avatarUrl: string;
  errorMessageReview: string;
  errorMessageAuth: string;
  movies: MovieTypes[];
  promo: MovieTypes;
  favoriteMovies: MovieTypes[];
  comments: CommentTypes[];
  loadComments: () => void;
  postComment: (
    {rating: number, review: string},
    id: number,
  ) => void;
  deleteErrorMessage: () => void;
  deleteErrorMessageAuth: () => void;
  loadFilms: () => void;
  loadPromo: () => void;
  loadFavoriteFilms: () => void;
  changeStatusFilm: (
    newFilm: MovieTypes,
    status: number,
    onSuccess: () => void
  ) => void;
  activeGenre: string;
  changeGenre: (genre: string) => void;
  shownMovies: number;
  changeShownMovies: (amount: number) => void;
}

const AddReviewWrapped = withForm(AddReview);
const FullScreenVideoPlayerWrapped = withPlayer(FullScreenVideoPlayer);

const App: React.FunctionComponent<Props> = (props: Props) => {
  const {
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
  } = props;
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
