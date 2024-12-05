import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const useModalAnimations = () => {
  useGSAP(() => {
    gsap.to('#modal-heading', { opacity: 1, y: 0 });
    gsap.to('#call-to-action', { opacity: 1, delay: 2.5, y: -50 });
  }, []);
};

export default useModalAnimations;
