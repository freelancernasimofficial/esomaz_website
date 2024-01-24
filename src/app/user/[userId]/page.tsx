import IconBriefcase from "@/components/icons/IconBriefcase";
import IconLocationOutline from "@/components/icons/IconLocationOutline";
import IconRss from "@/components/icons/IconRss";
import IconSchoolOutline from "@/components/icons/IconSchoolOutline";
import PostCard from "@/components/post/PostCard";
import PostForm from "@/components/post/PostForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='centerCard  overflow-hidden mt-6'>
      <div className='flex w-full'>
        <div className='w-[450px] pr-6'>
          <div className='w-full p-4 rounded-lg bg-white shadow'>
            <div className='mb-4 flex justify-between'>
              <h2 className='font-bold text-xl'>Intro</h2>
              <Link className='text-blue-700  text-sm2' href='#'>
                Edit
              </Link>
            </div>

            <div className='text-sm2 flex items-center'>
              <IconLocationOutline className='w-6 h-6 mr-1 shrink-0' />{" "}
              <span className='mr-2'>Lives In</span>{" "}
              <span className='font-semibold'>Cairo , Eygept</span>
            </div>
            <div className='text-sm2 flex items-center mt-4'>
              <IconSchoolOutline className='w-6 h-6 mr-2 shrink-0' />{" "}
              <span className='mr-2'>Studied at</span>{" "}
              <span className='font-semibold'>University of Turkey</span>
            </div>
            <div className='text-sm2 flex items-center mt-4'>
              <IconBriefcase className='w-5 h-5 mr-2 ml-0.5 shrink-0' />{" "}
              <span className='mr-2'>Works at</span>{" "}
              <span className='font-semibold'>Envato Market</span>
            </div>
            <div className='text-sm2 flex items-center mt-4'>
              <IconRss className='w-5 h-5 mr-2 ml-0.5 shrink-0' />{" "}
              <span className='mr-2'>Followed by</span>{" "}
              <span className='font-semibold'>1,205,200 People</span>
            </div>
          </div>
          <div className='w-full p-2 mt-6 rounded-lg bg-white shadow'>
            <div className='px-3 pt-1.5 flex justify-between'>
              <h2 className='font-bold text-xl'>Friends</h2>
              <Link className='text-blue-700 text-sm2' href='#'>
                View All
              </Link>
            </div>
            <div className='flex flex-wrap justify-between'>
              {[...Array(6)].map((item, index) => {
                return (
                  <div
                    key={index.toString()}
                    className='w-28 h-32 text-center m-3 '
                  >
                    <div className='overflow-hidden rounded-lg h-28 w-full'>
                      {" "}
                      <Image
                        className='w-full h-full'
                        height={150}
                        width={150}
                        alt='friends avatar'
                        src='/images/static/avatars/avatar-1.jpg'
                      />
                    </div>
                    <h2 className='mt-1 text-sm3 font-medium'>Sheikh Habib</h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <PostForm />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
          <PostCard />
        </div>
      </div>
    </div>
  );
}
