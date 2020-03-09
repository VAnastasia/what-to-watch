import React, {PureComponent, createRef} from 'react';
// import propTypes from "prop-types";

const withPlayer = (Component) => {
  class WithPlayer extends PureComponent {
    constructor(props) {
      super(props);

      this._videoRef = createRef();

      this.state = {
        isPlaying: false,
      };

      this.handleVideoPlay = this.handleVideoPlay.bind(this);
    }

    handleVideoPlay() {
      const video = this._videoRef.current;

      if (video.paused) {
        video.play();
        this.setState({
          isPlaying: true,
        });
      } else {
        video.pause();
        this.setState({
          isPlaying: false,
        });
      }
    }

    render() {
      const {isPlaying} = this.state;

      return (
        <Component
          {...this.props}
          ref={this._videoRef}
          isPlaying={isPlaying}
          onPlayButtonClick={this.handleVideoPlay}
        />
      );
    }
  }

  WithPlayer.propTypes = {
    // videoSrc: propTypes.string.isRequired,
    // posterSrc: propTypes.string.isRequired,
    // isPlaying: propTypes.bool.isRequired,
  };

  return WithPlayer;
};

export default withPlayer;
