import React, {createRef} from "react";
import renderer from "react-test-renderer";
import FullScreenVideoPlayer from "./full-screen-video-player.jsx";
import {film} from "../../test-data";

const noop = () => {};

it(`VideoPlayer should render correctly`, () => {
  const tree = renderer
    .create(
        <FullScreenVideoPlayer
          film={film}
          isPlaying={true}
          videoRef={createRef()}
          onPlayButtonClick={noop}
          onFullScreenButtonClick={noop}
          onLoadedMetadata={noop}
          onTimeUpdate={noop}
          playProgress={0}
          elapsedTime={``}
        />,
        {
          createNodeMock: () => {
            return {};
          }
        }
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
