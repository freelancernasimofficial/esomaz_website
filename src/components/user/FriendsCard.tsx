import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function FriendsCard({}: Props) {
  return (
    <div className='w-full p-4 mt-4 rounded-lg bg-white shadow'>
      <div className='mb-2 flex justify-between'>
        <h2 className='font-bold text-xl'>Friends</h2>
        <Link className='text-primary-main text-sm2' href='#'>
          View All
        </Link>
      </div>
      <div className='flex flex-col w-full'>
        {[...Array(5)].map((item, index) => {
          return (
            <div key={index.toString()} className='flex my-2'>
              <div className='w-9 h-9 overflow-hidden shrink-0 rounded-full'>
                <Image
                  className='w-full h-full'
                  height={40}
                  width={40}
                  alt='user avatar'
                  src={`/images/static/avatars/avatar-1.jpg`}
                />
              </div>
              <div className='ml-2'>
                <Link href='/user' className='block'>
                  <h4 className='font-medium text-sm2'>Md Nasim</h4>
                </Link>
                <span className='block text-sm5 text-gray-500 leading-3'>
                  13k Followers
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
