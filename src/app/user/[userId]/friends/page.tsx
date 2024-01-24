import ProfileCard from "@/components/user/ProfileCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='centerCard mt-6'>
      <div className='bg-white shadow p-4 rounded-lg mb-8'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-xl'>Friends (4829)</h2>
        </div>
        <div className='flex flex-col w-full'>
          {[...Array(100)].map((item, index) => {
            return (
              <div key={index.toString()} className='flex justify-between mt-4'>
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
                      13k Followers
                    </span>
                  </div>
                </div>
                <button className='btn btn-error-transparent'>Unfriend</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
