import IconBriefcase from "@/components/icons/IconBriefcase";
import IconChat from "@/components/icons/IconChat";
import IconHomeOutline from "@/components/icons/IconHomeOutline";
import IconUsers from "@/components/icons/IconUsers";
import IconVideo from "@/components/icons/IconVideo";
import Link from "next/link";
import React from "react";
import IconHorizontalDots from "../icons/IconHorizontalDots";
import Image from "next/image";

type Props = {};

export default function RightSidebar({}: Props) {
  return (
    <div className='hidden lg:flex max-w-96 w-full h-full sticky top-20  flex-col pl-6'>
      <div className='bg-white shadow p-4 rounded-lg'>
        <div className='flex justify-between'>
          <h2 className='font-semibold text-base'>People You May Know</h2>
          <Link href='#' className='text-sm2 text-blue-700'>
            See All
          </Link>
        </div>
        <div className='flex flex-col w-full'>
          {[...Array(5)].map((item, index) => {
            return (
              <div key={index.toString()} className='flex justify-between mt-4'>
                <div className='flex'>
                  <div className='w-9 h-9 overflow-hidden shrink-0 rounded-full'>
                    <Image
                      className='w-full h-full'
                      height={40}
                      width={40}
                      alt='user avatar'
                      src={`/images/static/avatars/avatar-${index + 1}.jpg`}
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
                <button className='btn btn-primary-transparent'>Follow</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
