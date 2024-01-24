import ProfileCard from "@/components/user/ProfileCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='centerCard mt-6'>
      <div className='bg-white shadow p-4 rounded-lg mb-8'>
        <div className='flex justify-between mb-4'>
          <h2 className='font-bold text-xl'>Photos (942)</h2>
        </div>
        <div className='md:flex md:flex-wrap justify-between w-full'>
          {[...Array(100)].map((item, index) => {
            return (
              <div
                key={index.toString()}
                className='w-full md:w-56 md:h-48 md:m-2 mb-4 md:mb-0 overflow-hidden rounded-lg'
              >
                <Image
                  className='w-full h-full'
                  width={100}
                  height={100}
                  alt='profile photos'
                  src='/images/static/post/img-2.jpg'
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
