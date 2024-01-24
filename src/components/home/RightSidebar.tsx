import IconBriefcase from "@/components/icons/IconBriefcase";
import IconChat from "@/components/icons/IconChat";
import IconHomeOutline from "@/components/icons/IconHomeOutline";
import IconUsers from "@/components/icons/IconUsers";
import IconVideo from "@/components/icons/IconVideo";
import Link from "next/link";
import React from "react";

type Props = {};

export default function RightSidebar({}: Props) {
  return (
    <div className='min-w-60 h-full sticky top-20 flex flex-col'>
      <Link
        href='#'
        className='flex items-center w-full hover:bg-gray-200 rounded p-2 mb-1'
      >
        <IconHomeOutline className='w-5 h-5' />{" "}
        <span className='ml-3 block mt-0.5 font-medium text-sm2'>Newsfeed</span>
      </Link>
      <Link
        href='#'
        className='flex items-center w-full hover:bg-gray-200 rounded p-2 mb-1'
      >
        <IconBriefcase className='w-5 h-5' />{" "}
        <span className='ml-3.5 block mt-0.5 font-medium text-sm2'>
          Projects
        </span>
      </Link>
      <Link
        href='#'
        className='flex items-center w-full hover:bg-gray-200 rounded p-2 mb-1'
      >
        <IconVideo className='w-6 h-6' />{" "}
        <span className='ml-3 block mt-0.5 font-medium text-sm2'>Shorts</span>
      </Link>
      <Link
        href='#'
        className='flex items-center w-full hover:bg-gray-200 rounded p-2 mb-1'
      >
        <IconChat className='w-5 h-5' />{" "}
        <span className='ml-3 block mt-0.5 font-medium text-sm2'>Messages</span>
      </Link>
      <Link
        href='#'
        className='flex items-center w-full hover:bg-gray-200 rounded p-2 mb-1'
      >
        <IconUsers className='w-5 h-5' />{" "}
        <span className='ml-3 block mt-0.5 font-medium text-sm2'>Friends</span>
      </Link>
    </div>
  );
}
