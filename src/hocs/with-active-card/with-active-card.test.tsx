import * as React from "react";
import * as renderer from "react-test-renderer";
import withActiveCard from "./with-active-card";
import {noop} from "../../const";

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withActiveCard(MockComponent);

it(`withActiveCard is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      activeCard={1}
      onMovieCardHover={noop}
      onMovieCardOut={noop}
      isPlayer={true}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
