import * as React from 'react';
import {Subtract} from "utility-types";
import {formatTime} from "../../utils";

interface State {
  isPlaying: boolean;
  playProgress: number;
  duration: number;
  currentTime: number;
  elapsedTime: string;
}

interface InjectingProps {
  onPlayButtonClick: () => void;
  onFullScreenButtonClick: () => void ;
  onLoadedMetadata: (evt: React.SyntheticEvent<EventTarget>) => void;
  onTimeUpdate: (evt: React.SyntheticEvent<EventTarget>) => void;
}

const withPlayer = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  class WithPlayer extends React.PureComponent<T, State> {
    private videoRef: React.RefObject<HTMLVideoElement>;

    constructor(props) {
      super(props);

      this.videoRef = React.createRef();

      this.state = {
        isPlaying: false,
        playProgress: 0,
        duration: 0,
        currentTime: 0,
        elapsedTime: `0:00:00`
      };

      this.handleVideoPlay = this.handleVideoPlay.bind(this);
      this.handleFullScreen = this.handleFullScreen.bind(this);
      this.handleLoadedMetadata = this.handleLoadedMetadata.bind(this);
      this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    }

    handleVideoPlay() {
      this.setState((prevState) => {
        return {
          isPlaying: !prevState.isPlaying,
        };
      });
    }

    handleFullScreen() {
      const video = this.videoRef.current;
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitEnterFullScreen) {
        video.webkitEnterFullScreen();
      } else if (video.requestFullscreen) {
        video.requestFullscreen();
      }
    }

    handleLoadedMetadata(evt) {
      this.setState({
        duration: Math.floor(evt.target.duration),
      });
    }

    handleTimeUpdate(evt) {
      this.setState({
        currentTime: Math.floor(evt.target.currentTime),
        playProgress: (this.state.currentTime / this.state.duration) * 100,
        elapsedTime: formatTime(this.state.duration - this.state.currentTime)
      });
    }

    componentDidUpdate() {
      const video = this.videoRef.current;
      if (this.state.isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    }

    componentWillUnmount() {
      this.videoRef = null;
    }

    render() {
      const {isPlaying, playProgress, elapsedTime} = this.state;

      return (
        <Component
          {...this.props}
          videoRef={this.videoRef}
          isPlaying={isPlaying}
          playProgress={playProgress}
          elapsedTime={elapsedTime}
          onPlayButtonClick={this.handleVideoPlay}
          onFullScreenButtonClick={this.handleFullScreen}
          onLoadedMetadata={this.handleLoadedMetadata}
          onTimeUpdate={this.handleTimeUpdate}
        />
      );
    }
  }

  return WithPlayer;
};

export default withPlayer;
