"use client";

import Link from 'next/link';
import Image from 'next/image';
import { GoHome } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { BiMessageDetail } from "react-icons/bi";
import { MdNotificationsNone } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const isLoggedIn = false; 
  return (
    <div className="w-[70px] min-h-screen flex flex-col justify-between items-center 
                    py-4 text-4xl bg-white ">
      <div className='logo'>
        <Link href="/post">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </Link>
      </div>  
      <div className="flex flex-col gap-6 text-gray-500">
        <Link href="/post">
          <GoHome className={`hover:text-black ${pathname === '/post' ? 'text-black' : ''}`} />
        </Link>
        <Link href="/search">
          <FiSearch className={`hover:text-black ${pathname === '/search' ? 'text-black' : ''}`} />
        </Link>
        <Link href="/message">
          <BiMessageDetail className={`hover:text-black ${pathname === '/message' ? 'text-black' : ''}`} />
        </Link>
        <Link href="/notification">
          <MdNotificationsNone className={`hover:text-black ${pathname === '/notification' ? 'text-black' : ''}`} />
        </Link>
        <Link href="/profile">
          <FaRegUser className={`hover:text-black ${pathname === '/profile' ? 'text-black' : ''}`} />
        </Link>
      </div>
      <div>
        {isLoggedIn && (
          <MdOutlineLogout className="text-gray-500 hover:text-black" />
        )}
      </div>
      
    </div>
  );
};

export default Sidebar;
