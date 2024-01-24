import IconBriefcase from "@/components/icons/IconBriefcase";
import IconHorizontalDots from "@/components/icons/IconHorizontalDots";
import IconLocationFilled from "@/components/icons/IconLocationFilled";
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
      <div className='centerCard  overflow-hidden mt-6'>
        <div className='flex w-full'>
          <div className='w-[450px] pr-6'>
            <div className='w-full p-4 rounded-lg bg-white'>
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
                <span className='mr-2'>Followd by</span>{" "}
                <span className='font-semibold'>1,205,200 People</span>
              </div>
            </div>
            <div className='w-full p-2 mt-6 rounded-lg bg-white'>
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
                      <h2 className='mt-1 text-sm3 font-medium'>
                        Sheikh Habib
                      </h2>
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
    </div>
  );
}
