import * as React from "react";
import * as renderer from "react-test-renderer";
import FullScreenVideoPlayer from "./full-screen-video-player";
import {film} from "../../test-data";
import {noop} from "../../const";

it(`VideoPlayer should render correctly`, () => {
  const tree = renderer
    .create(
        <FullScreenVideoPlayer
          film={film}
          isPlaying={true}
          videoRef={React.createRef()}
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
