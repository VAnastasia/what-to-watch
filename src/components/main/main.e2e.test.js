import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";
import {promoFilm, films} from "../../test-data";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should title be clicked`, () => {
  const onClick = jest.fn();
  const main = shallow(
      <Main
        promoFilm={promoFilm}
        films={films}
        onClick={onClick}
      />
  );

  const titlesFilm = main.find(`.small-movie-card__link`);

  titlesFilm.forEach((title) => {
    title.props().onClick();
  });
  expect(onClick).toHaveBeenCalledTimes(titlesFilm.length);
});
