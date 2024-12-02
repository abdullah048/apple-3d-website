import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import Highlights from '@/components/Highlights';

export default function Home() {
  return (
    <main className=''>
      <Navbar />
      <Hero />
      <Highlights />
    </main>
  );
}
