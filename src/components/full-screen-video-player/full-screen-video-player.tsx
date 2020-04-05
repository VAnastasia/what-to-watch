import * as React from "react";
import Movie from "../../adapters/movie";
import history from "../../history";
import {MovieTypes} from "../../types";

interface Props {
  film: MovieTypes;
  isPlaying: boolean;
  playProgress: number;
  elapsedTime: string;
  videoRef: React.RefObject<HTMLVideoElement>;
  onPlayButtonClick: () => void;
  onFullScreenButtonClick: () => void;
  onLoadedMetadata: () => void;
  onTimeUpdate: () => void;
}

const FullScreenVideoPlayer: React.FunctionComponent<Props> = (props: Props) => {
  const {
    isPlaying,
    onPlayButtonClick,
    onFullScreenButtonClick,
    onLoadedMetadata,
    onTimeUpdate,
    playProgress,
    elapsedTime,
    videoRef,
    film,
  } = props;
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
                <React.Fragment>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </React.Fragment>
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

export default FullScreenVideoPlayer;
