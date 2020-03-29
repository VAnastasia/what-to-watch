import React, {createRef} from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import FullScreenVideoPlayer from "./full-screen-video-player.jsx";
import {film} from "../../test-data";

const noop = () => {};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should player be play, fullscreen`, () => {
  const onPlayButtonClick = jest.fn();
  const onFullScreenButtonClick = jest.fn();

  const player = mount(
      <FullScreenVideoPlayer
        film={film}
        isPlaying={true}
        videoRef={createRef()}
        onLoadedMetadata={noop}
        onTimeUpdate={noop}
        playProgress={0}
        elapsedTime={``}
        onPlayButtonClick={onPlayButtonClick}
        onFullScreenButtonClick={onFullScreenButtonClick}
      />
  );

  const playButton = player.find(`.player__play`);
  const fullScreenButton = player.find(`.player__full-screen`);

  playButton.simulate(`click`);
  fullScreenButton.simulate(`click`);
  expect(onPlayButtonClick.mock.calls.length).toBe(1);
  expect(onFullScreenButtonClick.mock.calls.length).toBe(1);
});
