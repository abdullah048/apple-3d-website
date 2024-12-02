import Image from 'next/image';
import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants';

const Navbar = () => {
  return (
    <header className='h-[60px] w-full py-5 sm:px-10 px-5 flex justify-between items-center'>
      <nav className='flex w-full items-center screen-max-width'>
        <Image src={appleImg} alt='logo' width={14} height={18} />

        <ul className='flex space-x-5 list-none flex-1 justify-center max-sm:hidden'>
          {navLists.map(nav => (
            <li
              className='text-sm xl:text-base cursor-pointer text-gray hover:text-white transition-colors'
              key={nav}>
              {nav}
            </li>
          ))}
        </ul>

        <div className='flex items-baseline gap-4 max-sm:justify-end max-sm:flex-1'>
          {/* Todo: Add menu for small screens */}
          <Image src={searchImg} alt='search' width={18} height={18} />
          <Image src={bagImg} alt='bag' width={18} height={18} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
