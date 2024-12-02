'use client';

import useHeroAnimations from '@/hooks/useHeroAnimations';
import useHeroVideoSource from '@/hooks/useHeroVideoSource';
import Loading from './Loading';

const Hero = () => {
  const videoSrc = useHeroVideoSource();
  useHeroAnimations();
  return (
    <section className='w-full nav-height relative'>
      <div className='h-5/6 w-full flex-center flex-col'>
        <p id='hero-text' className='hero-title'>
          Iphone 15 Pro
        </p>
        <div className='w-9/12 xs:w-1/2 sm:w-10/12 md:w-10/12'>
          {!videoSrc ? (
            <Loading />
          ) : (
            <video
              className='pointer-events-none'
              autoPlay={true}
              muted
              playsInline={true}
              key={videoSrc}>
              <source src={videoSrc} type='video/mp4' />
            </video>
          )}
        </div>
      </div>
      <div
        id='call-to-action'
        className='flex flex-col items-center opacity-0 translate-y-20'>
        <a href='#highlights' className='btn'>
          Buy
        </a>
        <p className='text-xl'>From $199/month or $999</p>
      </div>
    </section>
  );
};

export default Hero;
