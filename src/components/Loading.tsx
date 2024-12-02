import { Loader } from 'lucide-react';

const Loading = () => {
  return (
    <div className='flex-center w-full h-full bg-transparent'>
      <Loader className='text-blue animate-spin' />
    </div>
  );
};

export default Loading;
