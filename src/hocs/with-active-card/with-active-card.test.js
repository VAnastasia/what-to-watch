import React from "react";
import renderer from "react-test-renderer";
import withActiveCard from "./with-active-card.jsx";

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withActiveCard(MockComponent);

it(`withActiveCard is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      activeCard={1}
      onMovieCardHover={() => {}}
      onMovieCardOut={() => {}}
      isPlayer={true}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
