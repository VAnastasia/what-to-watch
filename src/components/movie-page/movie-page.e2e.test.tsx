import * as React from "react";
import {shallow, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import MoviePage from "./movie-page";
import {film, films} from "../../test-data";
import {noop} from "../../const";

configure({
  adapter: new Adapter(),
});

it(`Should MoviePage change status film`, () => {
  const onChangeStatusFilm = jest.fn();

  const moviePage = shallow(
      <MoviePage
        film={film}
        movies={films}
        loadComments={noop}
        comments={[]}
        userBlock={<div></div>}
        authorizationStatus={`AUTH`}
        loadFilms={noop}
        loadFavoriteFilms={noop}
        loadPromo={noop}
        changeStatusFilm={onChangeStatusFilm}
      />
  );

  moviePage.find(`.btn--list`).simulate(`click`);
  expect(onChangeStatusFilm.mock.calls.length).toBe(1);
});
