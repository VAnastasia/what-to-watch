import React, {PureComponent, createRef} from 'react';

const formatTime = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  return [
    hours.toString().padStart(2, `0`),
    minutes.toString().padStart(2, `0`),
    seconds.toString().padStart(2, `0`)
  ].join(`:`);
};

const withPlayer = (Component) => {
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.videoRef = createRef();

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
      video.requestFullscreen();
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

    componentDidMount() {
      const video = this.videoRef.current;

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };
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
