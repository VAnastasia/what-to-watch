import React, {PureComponent, createRef} from 'react';
import propTypes from "prop-types";

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
      this.setState((prevState) => {
        return {
          isPlaying: !prevState.isPlaying,
        };
      });
    }

    componentDidMount() {
      const {videoSrc} = this.props;
      const video = this._videoRef.current;

      video.src = videoSrc;
      video.muted = false;

      video.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      // video.onpause = () => {
      //   this.setState({
      //     isPlaying: false
      //   });
      // };
    }

    componentDidUpdate() {
      const video = this._videoRef.current;

      const {isPlaying} = this.state;
      const {videoSrc} = this.props;

      if (isPlaying) {
        video.src = videoSrc;
        video.play();
      } else {
        video.load();
      }
    }

    componentWillUnmount() {
      const video = this._videoRef.current;

      video.onplay = null;
      video.src = ``;
      video.muted = false;
    }

    render() {
      const {isPlaying} = this.state;
      const {posterSrc, videoSrc} = this.props;

      return (
        <Component
          {...this.props}
          ref={this._videoRef}
          isPlaying={isPlaying}
          onPlayButtonClick={this.handleVideoPlay}
        >
          <video ref={this._videoRef} poster={posterSrc} src={videoSrc} alt="" width="280" height="175" />
        </Component>
      );
    }
  }

  WithPlayer.propTypes = {
    videoSrc: propTypes.string.isRequired,
    posterSrc: propTypes.string.isRequired,
    // isPlaying: propTypes.bool.isRequired,
  };

  return WithPlayer;
};

export default withPlayer;
