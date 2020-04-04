import * as React from "react";
import {mount, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import GenreList from "./genre-list";
import {films} from "../../test-data";

configure({
  adapter: new Adapter(),
});

it(`Should GenreList be change genre`, () => {
  const onGenreChange = jest.fn();

  const genreList = mount(
      <GenreList
        activeGenre={`All genres`}
        movies={films}
        changeGenre={onGenreChange} />
  );

  const genreItem = genreList.find(`.catalog__genres-link`).first();
  genreItem.simulate(`click`);
  expect(onGenreChange.mock.calls.length).toBe(1);
});
