import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Highlights from '@/components/Highlights';
import Modal from '@/components/Modal';

export default function Home() {
  return (
    <main className=''>
      <Navbar />
      <Hero />
      <Highlights />
      <Modal />
    </main>
  );
}
