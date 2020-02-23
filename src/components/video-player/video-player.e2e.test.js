import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player";

const mock = {
  videoSrc: `path`,
  posterSrc: `path`
};

Enzyme.configure({
  adapter: new Adapter()
});

it(`Should video player change state`, () => {
  const {videoSrc, posterSrc} = mock;

  const videoPlayerWrapper = (isPlaying) => {
    return mount(
        <VideoPlayer
          isPlaying={isPlaying}
          videoSrc={videoSrc}
          posterSrc={posterSrc}
        />
    );
  };
  expect(videoPlayerWrapper(true).state(`isPlaying`)).toBe(true);
  expect(videoPlayerWrapper(false).state(`isPlaying`)).toBe(false);
});
