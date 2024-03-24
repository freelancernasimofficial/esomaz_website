import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  children: any;
  params: {
    postId: string;
  };
};

export default function layout({ children, params }: Props) {
  return (
    <div className='container'>
      <div className='centerCardSmall bg-transparent overflow-hidden'>
        <div className='flex items-center bg-white rounded px-2 py-1.5 overflow-x-scroll justify-between'>
          <Link
            href={`/posts/${params?.postId}/reactions`}
            tabIndex={-1}
            className='focus:bg-transparent w-10 h-10 shrink-0 flex items-center justify-center  rounded-full bg-gray-100 mr-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/all.png'
              alt=''
            />
          </Link>
          <Link
            href={`/posts/${params?.postId}/reactions/thumbsup`}
            tabIndex={-1}
            className='focus:bg-transparent w-10 h-10 shrink-0 flex items-center justify-center  rounded-full bg-gray-100 mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/thumbsup.png'
              alt=''
            />
          </Link>{" "}
          <Link
            href={`/posts/${params?.postId}/reactions/thumbsdown`}
            tabIndex={-1}
            className='focus:bg-transparent w-10 h-10 shrink-0 flex items-center justify-center  rounded-full bg-gray-100 mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/thumbsdown.png'
              alt=''
            />
          </Link>{" "}
          <div
            tabIndex={-1}
            className='focus:bg-transparent w-10 h-10 shrink-0 flex items-center justify-center  rounded-full bg-gray-100 mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/thumbsup.png'
              alt=''
            />
          </div>{" "}
          <div
            tabIndex={-1}
            className='focus:bg-transparent w-10 h-10 shrink-0 flex items-center justify-center  rounded-full bg-gray-100 mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/thumbsup.png'
              alt=''
            />
          </div>{" "}
          <div
            tabIndex={-1}
            className='focus:bg-transparent w-10 h-10 shrink-0 flex items-center justify-center  rounded-full bg-gray-100 mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/thumbsup.png'
              alt=''
            />
          </div>{" "}
          <div
            tabIndex={-1}
            className='focus:bg-transparent w-10 h-10 shrink-0 flex items-center justify-center  rounded-full bg-gray-100 mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/thumbsup.png'
              alt=''
            />
          </div>{" "}
          <div
            tabIndex={-1}
            className='focus:bg-transparent w-10 h-10 shrink-0 flex items-center justify-center  rounded-full bg-gray-100 mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/thumbsup.png'
              alt=''
            />
          </div>{" "}
          <div
            tabIndex={-1}
            className='focus:bg-transparent w-10 h-10 shrink-0 flex items-center justify-center  rounded-full bg-gray-100 mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/thumbsup.png'
              alt=''
            />
          </div>{" "}
          <div
            tabIndex={-1}
            className='focus:bg-transparent w-10 h-10 shrink-0 flex items-center justify-center  rounded-full bg-gray-100 mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/thumbsup.png'
              alt=''
            />
          </div>{" "}
          <div
            tabIndex={-1}
            className='focus:bg-transparent w-10 h-10 shrink-0 flex items-center justify-center  rounded-full bg-gray-100 mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/thumbsup.png'
              alt=''
            />
          </div>{" "}
          <div
            tabIndex={-1}
            className='focus:bg-transparent w-10 h-10 shrink-0 flex items-center justify-center  rounded-full bg-gray-100 ml-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/thumbsup.png'
              alt=''
            />
          </div>
        </div>
        <div> {children}</div>
      </div>
    </div>
  );
}
