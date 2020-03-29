import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import MoviePage from "./movie-page.jsx";
import {film, films} from "../../test-data";

const noop = () => {};

Enzyme.configure({
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
