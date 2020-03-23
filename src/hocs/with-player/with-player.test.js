import React, {createRef} from "react";
import renderer from "react-test-renderer";
import withPlayer from "./with-player.jsx";

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withPlayer(MockComponent);
const noop = () => {};

it(`withPlayer is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      videoRef={createRef()}
      isPlaying={true}
      playProgress={0}
      elapsedTime={``}
      onPlayButtonClick={noop}
      onFullScreenButtonClick={noop}
      onLoadedMetadata={noop}
      onTimeUpdate={noop}
    />
  ), {
    createNodeMock() {
      return {};
    }
  }).toJSON();

  expect(tree).toMatchSnapshot();
});
