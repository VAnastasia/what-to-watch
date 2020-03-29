import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ShowMore from "./show-more.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should ShowMore be click`, () => {
  const onClick = jest.fn();

  const showMore = shallow(
      <ShowMore
        onClick={onClick}
      />
  );

  showMore.simulate(`click`);
  expect(onClick.mock.calls.length).toBe(1);
});
