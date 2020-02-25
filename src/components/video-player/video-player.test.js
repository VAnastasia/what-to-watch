import React from "react";
import renderer from "react-test-renderer";
import VideoPlayer from "./video-player";

const mock = {
  isPlaying: true,
  videoSrc: `path`,
  posterSrc: `path`
};

it(`VideoPlayer should render correctly`, () => {
  const {isPlaying, videoSrc, posterSrc} = mock;
  const tree = renderer
    .create(
        <VideoPlayer
          isPlaying={isPlaying}
          videoSrc={videoSrc}
          posterSrc={posterSrc}
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
