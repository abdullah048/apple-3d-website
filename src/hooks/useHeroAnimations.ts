import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const useHeroAnimations = () => {
  useGSAP(() => {
    gsap.to('#hero-text', { opacity: 1, delay: 2.5 });
    gsap.to('#call-to-action', { opacity: 1, delay: 2.5, y: -50 });
  }, []);
};

export default useHeroAnimations;
