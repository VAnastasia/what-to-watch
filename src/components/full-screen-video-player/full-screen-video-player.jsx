import React, {Fragment} from "react";
import propTypes from "prop-types";
import Movie from "../../adapters/movie";
import history from "../../history.js";

const FullScreenVideoPlayer = (
    {
      isPlaying,
      onPlayButtonClick,
      onFullScreenButtonClick,
      onLoadedMetadata,
      onTimeUpdate,
      playProgress,
      elapsedTime,
      videoRef,
      film,
    }
) => {
  if (film) {
    const movie = new Movie(film);

    return (
      <div className="player">
        <video
          className="player__video"
          ref={videoRef}
          poster={movie.backgroundImage}
          onClick={onPlayButtonClick}
          onLoadedMetadata={onLoadedMetadata}
          onTimeUpdate={onTimeUpdate}
        >
          <source src={movie.video}/>
        </video>

        <button type="button" className="player__exit" onClick={history.goBack}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value={playProgress} max="100"></progress>
              <div className="player__toggler" style={{left: `${playProgress}%`}}>Toggler</div>
            </div>
            <div className="player__time-value">{elapsedTime}</div>
          </div>

          <div className="player__controls-row">
            <button type="button" className="player__play" onClick={onPlayButtonClick}>
              {isPlaying ? (
                <Fragment>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </Fragment>
              ) : (
                <Fragment>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </Fragment>
              )}
            </button>
            <div className="player__name">{movie.title}</div>

            <button type="button" className="player__full-screen" onClick={onFullScreenButtonClick}>
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
  return (<h1 style={{textAlign: `center`}}>Loading...</h1>);
};

FullScreenVideoPlayer.propTypes = {
  film: propTypes.shape({
    "id": propTypes.number,
    "name": propTypes.string,
    "poster_image": propTypes.string,
    "preview_image": propTypes.string,
    "background_image": propTypes.string,
    "background_color": propTypes.string,
    "description": propTypes.string,
    "rating": propTypes.number,
    "scores_count": propTypes.number,
    "director": propTypes.string,
    "starring": propTypes.arrayOf(propTypes.string),
    "run_time": propTypes.number,
    "genre": propTypes.string,
    "released": propTypes.number,
    "is_favorite": propTypes.bool,
    "video_link": propTypes.string,
    "preview_video_link": propTypes.string,
  }),
  isPlaying: propTypes.bool.isRequired,
  onPlayButtonClick: propTypes.func.isRequired,
  onFullScreenButtonClick: propTypes.func.isRequired,
  onLoadedMetadata: propTypes.func.isRequired,
  onTimeUpdate: propTypes.func.isRequired,
  playProgress: propTypes.number.isRequired,
  elapsedTime: propTypes.string.isRequired,
  videoRef: propTypes.object.isRequired,
};

export default FullScreenVideoPlayer;
