import Image from "next/image";
import React from "react";
import IconSearch from "../icons/IconSearch";
import IconBell from "../icons/IconBell";
import IconChat from "../icons/IconChat";
import Link from "next/link";

type Props = {};

export default function Header({}: Props) {
  return (
    <header className='h-16 bg-white border-b border-b-gray-200 sticky top-0 z-10'>
      <div className='container h-full'>
        <div className='flex items-center justify-between h-full'>
          <Link href='/' className='block flex-1 min-w-32 shrink-0'>
            <Image
              priority={true}
              width={150}
              height={70}
              className='w-32 invert shrink-0'
              alt='logo'
              src='/images/static/logo.png'
            />
          </Link>
          <div className='flex-1 md:block hidden relative'>
            <IconSearch className='absolute left-3 top-2/4 -translate-y-2/4 text-gray-400 w-5 h-5' />
            <input
              placeholder='Search Friends, Videos...'
              type='text'
              className='w-full pl-9 rounded-full focus:border-transparent'
            />
          </div>
          <div className='flex-1 flex items-center justify-end'>
            <Link href='/notifications'>
              <button className='svgCircleButton bg-gray-100'>
                <IconBell />
              </button>
            </Link>
            <Link href='/messages'>
              <button className='svgCircleButton bg-gray-100 ml-4'>
                <IconChat />
              </button>
            </Link>
            <Link
              href='/account'
              className='p-0 ml-4 h-10 w-10 overflow-hidden rounded-full'
            >
              <Image
                className='w-full !h-full'
                height={40}
                width={40}
                alt='avatar'
                src='/images/static/avatars/avatar-1.jpg'
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
