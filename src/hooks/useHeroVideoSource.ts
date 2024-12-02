'use client';

import { useState, useEffect } from 'react';
import { heroVideo, smallHeroVideo } from '@/utils';

const useHeroVideoSource = () => {
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setVideoSrc(window.innerWidth > 640 ? heroVideo : smallHeroVideo);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return videoSrc;
};

export default useHeroVideoSource;
