import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function FriendsCard({}: Props) {
  return (
    <div className='w-full p-2 mt-6 rounded-lg bg-white shadow'>
      <div className='px-3 pt-1.5 mb-1 flex justify-between'>
        <h2 className='font-bold text-xl'>Friends</h2>
        <Link className='text-primary-main text-sm2' href='#'>
          View All
        </Link>
      </div>
      <div className='flex flex-wrap justify-between'>
        {[...Array(6)].map((item, index) => {
          return (
            <div
              key={index.toString()}
              className='w-24 h-28 sm:w-28 sm:h-32 lg:w-24  text-center mx-3 my-1 '
            >
              <div className='overflow-hidden rounded-lg  sm:h-28 lg:h-24 w-full'>
                {" "}
                <Image
                  className='w-full h-full'
                  height={150}
                  width={150}
                  alt='friends avatar'
                  src='/images/static/avatars/avatar-1.jpg'
                />
              </div>
              <h2 className='mt-1 text-sm5 sm:text-sm3 font-medium'>
                Sheikh Habib
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}
