import Link from "next/link";
import React from "react";
import Image from "next/image";

type Props = {};

export default function RightSidebar({}: Props) {
  return (
    <div className='hidden lg:flex max-w-96 w-full full-height sticky top-20  flex-col pl-6'>
      <div className='bg-white shadow p-4 rounded-lg overflow-hidden '>
        <div className='flex justify-between pb-2'>
          <h2 className='font-semibold text-lg'>Active Friends</h2>
          <Link href='#' className='text-sm2 text-blue-700'>
            See All
          </Link>
        </div>
        <div className='flex-1 w-full h-full overflow-y-scroll pb-10'>
          {[...Array(15)].map((item, index) => {
            return (
              <div key={index.toString()} className='flex justify-between mb-4'>
                <div className='flex'>
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
                      Active Now
                    </span>
                  </div>
                </div>
                <button className='btn btn-primary-transparent'>Chat</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
