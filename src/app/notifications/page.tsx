import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='container'>
      <div className='centerCardSmall bg-white rounded-lg p-4'>
        <h2 className='font-bold text-xl mb-4'>Notifications</h2>

        <div className='flex flex-col w-full'>
          {[...Array(100)].map((item, index) => {
            return (
              <div key={index.toString()} className='flex items-start mb-4'>
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
                  <div className='flex items-center justify-start'>
                    <span className='font-medium text-sm2'>
                      Md Nasim{" "}
                      <span className='font-normal'>commented on your</span>{" "}
                      <Link className='text-blue-700 !font-normal' href='/'>
                        post
                      </Link>
                    </span>
                  </div>
                  <span className='block text-sm4 text-gray-500 leading-4'>
                    11:34 PM, Jan 21, 2024
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
