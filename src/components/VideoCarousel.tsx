'use client';

// 2:09:00

import { highlightsSlides } from '@/constants';
import { pauseImg, playImg, replayImg } from '@/utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Image from 'next/image';
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLSpanElement[]>([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState<
    SyntheticEvent<HTMLVideoElement, Event>[]
  >([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to('#slider', {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: 'power2.inOut',
    });

    gsap.to('#slide-video', {
      scrollTrigger: {
        trigger: '#slide-video',
        toggleActions: 'restart none none none',
      },
      onComplete: () =>
        setVideo(prevVideo => ({
          ...prevVideo,
          startPlay: true,
          isPlaying: true,
        })),
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      } else {
        if (startPlay) videoRef.current[videoId].play();
      }
    }
  }, [isPlaying, videoId, startPlay, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;

    if (span[videoId]) {
      // animate the progress of the videos
      const animation = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.floor(animation.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;
            gsap.to(videoDivRef.current[videoId], {
              width: window.innerWidth < 1200 ? '10vw' : '4vw',
            });

            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: 'white',
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: '12px',
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: '#afafaf',
            });
          }
        },
      });

      const animationUpdate = () => {
        animation.progress(
          videoRef.current[videoId].currentTime /
            highlightsSlides[videoId].videoDuration
        );
      };

      if (isPlaying) {
        gsap.ticker.add(animationUpdate);
      } else {
        animation.pause();
        gsap.ticker.remove(animationUpdate);
      }
    }
  }, [videoId, isPlaying]);

  const handleVideoRef = useCallback(
    (element: HTMLVideoElement | null, index: number) => {
      if (element) {
        videoRef.current[index] = element;
      }
    },
    []
  );

  const handleVideoDivRef = useCallback(
    (element: HTMLSpanElement | null, index: number) => {
      if (element) {
        videoDivRef.current[index] = element;
      }
    },
    []
  );

  const handleVideoSpanRef = useCallback(
    (element: HTMLSpanElement | null, index: number) => {
      if (element) {
        videoSpanRef.current[index] = element;
      }
    },
    []
  );

  const handlePlayPause = useCallback(
    (
      action: 'video-reset' | 'play' | 'pause' | 'video-end' | 'video-last',
      index?: number
    ) => {
      switch (action) {
        case 'video-end':
          setVideo(prev => {
            return {
              ...prev,
              isEnd: true,
              videoId: typeof index === 'number' ? index + 1 : 0,
            };
          });
          break;
        case 'video-last':
          setVideo(prev => ({
            ...prev,
            isLastVideo: true,
          }));
          break;
        case 'video-reset':
          setVideo(prevVideo => ({
            ...prevVideo,
            isLastVideo: false,
            videoId: 0,
          }));
          break;
        case 'play':
          setVideo(prevVideo => ({
            ...prevVideo,
            isPlaying: !prevVideo.isPlaying,
          }));
          break;
        case 'pause':
          setVideo(prevVideo => ({
            ...prevVideo,
            isPlaying: !prevVideo.isPlaying,
          }));
          break;
        default:
          return video;
      }
    },
    [video]
  );

  const handleProcess = useCallback(() => {
    if (isLastVideo) {
      handlePlayPause('video-reset');
    } else if (!isPlaying) {
      handlePlayPause('play');
    } else {
      handlePlayPause('pause');
    }
  }, [handlePlayPause, isLastVideo, isPlaying]);

  const handlePlay = useCallback(() => {
    setVideo(prevVideo => ({
      ...prevVideo,
      isPlaying: true,
    }));
  }, [setVideo]);

  const handleLoadedMetadata = useCallback(
    (event: SyntheticEvent<HTMLVideoElement, Event>) => {
      setLoadedData(prev => [...prev, event]);
    },
    []
  );

  const handleVideoEnd = useCallback(
    (index: number) => {
      if (index !== 3) {
        handlePlayPause('video-end', index);
      } else {
        handlePlayPause('video-last', index);
      }
    },
    [handlePlayPause]
  );

  return (
    <>
      <div className='flex items-center'>
        {highlightsSlides?.map((slide, i) => (
          <div key={slide.id} id='slider' className='pr-10 sm:pr-20'>
            <div className='video-carousel_container'>
              <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                <video
                  ref={element => handleVideoRef(element, i)}
                  id='slide-video'
                  preload='auto'
                  muted
                  playsInline
                  onPlay={handlePlay}
                  onLoadedMetadata={event => handleLoadedMetadata(event)}
                  onEnded={() => handleVideoEnd(i)}>
                  <source src={slide.video} type='video/mp4' />
                </video>
              </div>

              <div className='absolute top-12 left-[5%] z-10'>
                {slide.textLists?.map(text => (
                  <p key={text} className='text-xl font-medium md:text-2xl'>
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='relative flex-center mt-10'>
        <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full'>
          {videoRef.current?.map((_, i) => (
            <span
              key={i}
              ref={element => handleVideoDivRef(element, i)}
              className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'>
              <span
                className='absolute h-full w-full rounded-full'
                ref={element => handleVideoSpanRef(element, i)}
              />
            </span>
          ))}
        </div>

        <button className='control-btn' onClick={handleProcess}>
          <Image
            width={20}
            height={20}
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
