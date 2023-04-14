import React, { useRef } from 'react';
import { useGetFilmQuery } from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
import useVideo from '../../hooks/use-video';
import dayjs from 'dayjs';
import clsx from 'clsx';

const PlayerScreen = () => {
  const { id } = useParams();
  const filmQuery = useGetFilmQuery(id as string);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();
  const {
    isLoading,
    duration,
    currentTime,
    isPaused,
    loadedPercent,
    play,
    pause,
    handleDragAndDrop,
    handleProgressClick
  } = useVideo(videoRef, { isOnTimeUpdate: true });

  const playTimeLeft = duration - currentTime;
  const format = duration < 60 * 60 ? 'mm:ss' : 'HH:mm:ss';

  const handleExitClick = () => {
    navigate(-1);
  };

  const handlePlayClick = () => {
    if (isPaused) {
      void play();
    } else {
      pause();
    }
  };

  return (
    <div data-fullscreen="false" className="player">
      <video
        controls={false}
        ref={videoRef}
        src={filmQuery.data?.videoLink}
        className="player__video"
        poster={filmQuery.data?.backgroundImage}
      >
      </video>

      <Spinner
        style={{
          position: 'absolute',
          top: '0',
          left: '0'
        }}
        isActive={isLoading}
      />

      <button
        onClick={handleExitClick}
        type="button"
        className="player__exit"
      >
        Exit
      </button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress
              style={{ backgroundColor: 'red' }}
              onClick={handleProgressClick}
              className="player__progress"
              value={loadedPercent * 100} max="100"
            >

            </progress>
            <div
              onMouseDown={handleDragAndDrop}
              className="player__toggler"
              style={{ left: `${currentTime / duration * 100}%` }}
            >
              Toggler
            </div>
          </div>
          <div
            className="player__time-value"
          >{dayjs.duration(playTimeLeft, 'seconds').format(format)}
          </div>
        </div>

        <div className="player__controls-row">
          <button
            disabled={isLoading}
            onClick={handlePlayClick}
            type="button"
            className="player__play"
          >
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={clsx(isPaused && '#play-s', !isPaused && '#pause')}></use>
            </svg>
            <span>Play</span>
          </button>
          <div className="player__name">Transpotting</div>

          <button
            disabled={isLoading}
            onClick={() => void videoRef.current?.requestFullscreen({ navigationUI: 'show' })}
            type="button"
            className="player__full-screen"
          >
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerScreen;
