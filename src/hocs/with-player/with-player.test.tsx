import * as React from "react";
import * as renderer from "react-test-renderer";
import withPlayer from "./with-player";
import {noop} from "../../const";

const MockComponent = () => {
  return <div></div>;
};

const MockComponentWrapped = withPlayer(MockComponent);

it(`withPlayer is rendered correctly`, () => {
  const tree = renderer.create((
    <MockComponentWrapped
      videoRef={React.createRef()}
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
