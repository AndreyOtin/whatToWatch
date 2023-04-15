import React, { RefObject, useEffect, useState } from 'react';

type Options = {
  isOnTimeUpdate: boolean;
}

const defaultOptions: Options = {
  isOnTimeUpdate: false
};

const useVideo = (ref: RefObject<HTMLVideoElement>, options: Options = defaultOptions) => {
  const [isLoading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [loadedPercent, setLoadedPercent] = useState(0);

  const duration = ref.current?.duration || 0;
  const isPaused = ref.current?.paused;
  const isError = ref.current?.error;

  const play = () => ref.current?.play();
  const pause = () => ref.current?.pause();
  const stop = () => ref.current?.load();

  const handleProgressClick = (evt: React.MouseEvent<HTMLProgressElement>) => {
    if (!ref.current || isLoading) {
      return;
    }

    const rect = evt.currentTarget.getBoundingClientRect();
    const pos = (evt.pageX - rect.left) / rect.width;

    ref.current.currentTime = pos * ref.current.duration;
  };

  const handleDragAndDrop = (evt: React.MouseEvent<HTMLDivElement>) => {
    const parentRect = evt.currentTarget.parentElement?.getBoundingClientRect();
    const target = evt.target as HTMLDivElement;

    if (!parentRect || isLoading) {
      return;
    }

    document.ondragstart = function (event) {
      event.preventDefault();
      return false;
    };

    document.ondragend = function (event) {
      event.preventDefault();
      return false;
    };

    const onMouseMove = (e: MouseEvent) => {
      let pos = (e.pageX - parentRect.left) / parentRect.width;

      if (pos < 0) {
        pos = 0;
      } else if (pos > 1) {
        pos = 1;
      }

      if (ref.current) {
        target.style.left = `${(pos) * 100}%`;
        ref.current.currentTime = pos * ref.current.duration;
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', onMouseMove);
    }, { once: true });
  };

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (options.isOnTimeUpdate) {
      ref.current.addEventListener('timeupdate', () => {
        const bf = ref.current?.buffered;
        const duration1 = ref.current?.duration;

        if (!bf || !duration1) {
          return;
        }

        const loadEndPercentage = bf.end(bf.length - 1) / duration1;

        setLoadedPercent(loadEndPercentage);
        setCurrentTime(ref.current.currentTime);
      });
    }

    ref.current.addEventListener('loadeddata', () => {
      setLoading(false);
    });
  }, [options.isOnTimeUpdate, ref]);

  return {
    isError,
    isLoading,
    currentTime,
    duration,
    loadedPercent,
    isPaused,
    play,
    pause,
    stop,
    handleProgressClick,
    handleDragAndDrop
  };
};

export default useVideo;
