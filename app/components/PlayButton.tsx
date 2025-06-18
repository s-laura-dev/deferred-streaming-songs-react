'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

export const PlayButton = ({ url }: { url: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(url);
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [url]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <button onClick={togglePlay} className="absolute w-full h-full flex align-center justify-center bg-op play-button">
      <Image
        src={isPlaying ? '/PauseIcon.svg' : '/PlayIcon.svg'}
        alt={isPlaying ? 'Pause' : 'Play'}
        width={30}
        height={30}
      />
    </button>
  );
};
