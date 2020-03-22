import React, {PureComponent, createRef} from "react";
import propTypes from "prop-types";
import Movie from "../../adapters/movie";
import history from "../../history.js";

class FullScreenVideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this.movie = new Movie(props.film);
    this._videoRef = createRef();
  }

  render() {
    const style = {
      left: `30%`,
    };
    return (
      <div className="player">
        <video
          className="player__video"
          ref={this._videoRef}
          poster={this.movie.backgroundImage}
          autoPlay
        >
          <source src={this.movie.video}/>
        </video>

        <button type="button" className="player__exit" onClick={history.goBack}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"></progress>
              <div className="player__toggler" style={style}>Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen">
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

FullScreenVideoPlayer.propTypes = {
  film: propTypes.object.isRequired,
};

export default FullScreenVideoPlayer;
