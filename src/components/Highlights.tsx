'use client';

import useHighlightAnimations from '@/hooks/useHighlightAnimations';
import Image from 'next/image';
import { watchImg } from '@/utils';
import { ChevronRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const VideoCarousel = dynamic(() => import('@/components/VideoCarousel'), {
  ssr: false,
});

const Highlights = () => {
  useHighlightAnimations();
  return (
    <section
      className='w-screen overflow-hidden h-full common-padding bg-zinc'
      id='highlights'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full lg:flex items-end justify-between'>
          <h1 id='highlight-title' className='section-heading'>
            Get the highlights.
          </h1>
          <div className='flex flex-wrap items-end gap-5'>
            <p className='link'>
              Watch the film
              <Image
                className='ml-2 w-4 h-4 md:w-5 md:h-5'
                src={watchImg}
                alt='watch-image'
              />
            </p>
            <p className='link'>
              Watch the event
              <ChevronRight className='w-4 h-4 md:w-5 md:h-5' />
            </p>
          </div>
        </div>

        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
