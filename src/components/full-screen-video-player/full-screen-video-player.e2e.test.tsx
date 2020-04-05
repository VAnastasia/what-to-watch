import * as React from "react";
import {mount, configure} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import FullScreenVideoPlayer from "./full-screen-video-player";
import {film} from "../../test-data";
import {noop} from "../../const";

configure({
  adapter: new Adapter(),
});

it(`Should player be play, fullscreen`, () => {
  const onPlayButtonClick = jest.fn();
  const onFullScreenButtonClick = jest.fn();

  const player = mount(
      <FullScreenVideoPlayer
        film={film}
        isPlaying={true}
        videoRef={React.createRef()}
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
