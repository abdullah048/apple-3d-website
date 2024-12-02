import { useEffect } from 'react';
import gsap from 'gsap';

const useHighlightAnimations = () => {
  useEffect(() => {
    gsap.to('#highlight-title', { opacity: 1, y: 0 });
    gsap.to('.link', { opacity: 1, duration: 1, y: 0, stagger: 0.25 });
  }, []);
};

export default useHighlightAnimations;
