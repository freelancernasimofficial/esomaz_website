import IconHorizontalDots from "@/components/icons/IconHorizontalDots";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='container'>
      <div className='centerCard bg-white rounded-lg overflow-hidden shadow-sm'>
        <div className='w-full max-h-72 min-h-48  relative'>
          <div className='max-h-72 min-h-48 overflow-hidden rounded-t-lg'>
            <Image
              className='w-full h-full min-h-48 object-cover inset-0'
              height={400}
              width={800}
              alt='cover photo'
              src='/images/static/post/profile-cover.jpg'
            />
          </div>
          <div className='w-48 h-48 overflow-hidden rounded-full absolute left-2/4 -translate-x-2/4 bottom-0 translate-y-2/4 border-4 border-blue-500'>
            <Image
              width={200}
              height={200}
              className='w-full h-full'
              alt='avatar'
              src='/images/static/avatars/avatar-4.jpg'
            />
          </div>
        </div>
        <div className='pt-28 flex flex-col items-center pb-6 border-b'>
          <h2 className='font-semibold text-2xl'>Md Nasim</h2>
          <span className='block text-base font-medium text-gray-500 leading-3'>
            Professional Web Developer
          </span>
        </div>
        <div className='flex justify-between items-center'>
          <div
            className='flex-1 flex items-center
          [&>a]:p-4
          [&>a]:border-b-2
          [&>a]:border-b-transparent
          [&>a]:font-medium
          '
          >
            <Link className='block !border-b-blue-700' href='#'>
              Timeline
            </Link>
            <Link className='block hover:border-b-blue-700' href='#'>
              Friends
            </Link>
            <Link className='block hover:border-b-blue-700' href='#'>
              Photos
            </Link>
            <Link className='block hover:border-b-blue-700' href='#'>
              Videos
            </Link>
          </div>
          <div>
            <button className='svgCircleButton bg-gray-100 mr-4'>
              <IconHorizontalDots />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
