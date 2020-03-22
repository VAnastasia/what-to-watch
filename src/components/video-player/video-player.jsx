import React, {PureComponent, createRef} from 'react';
import propTypes from "prop-types";

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();
    this.state = {
      isPlaying: this.props.isPlaying
    };
  }

  componentDidMount() {
    const {videoSrc} = this.props;
    const video = this._videoRef.current;

    video.src = videoSrc;
    video.muted = true;

    video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    const {isPlaying, videoSrc} = this.props;

    if (isPlaying) {
      video.src = videoSrc;
      video.play();
    } else {
      video.pause();
    }
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.onplay = null;
    video.src = `path`;
    video.muted = false;

  }

  render() {
    const {posterSrc, videoSrc} = this.props;
    return (
      <video ref={this._videoRef} poster={posterSrc} src={videoSrc} alt="" width="280" height="175" />
    );
  }
}

VideoPlayer.propTypes = {
  videoSrc: propTypes.string.isRequired,
  posterSrc: propTypes.string.isRequired,
  isPlaying: propTypes.bool.isRequired,
};

export default VideoPlayer;
