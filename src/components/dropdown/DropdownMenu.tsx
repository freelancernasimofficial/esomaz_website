import React from "react";
import IconHorizontalDots from "../icons/IconHorizontalDots";
import Link from "next/link";

type Props = {};

export default function DropdownMenu({}: Props) {
  return (
    <button className='m-0 p-0 w-9 h-9 rounded-full bg-gray-50 flex flex-col items-center justify-center relative group'>
      <IconHorizontalDots />
      <div className='absolute text-left top-10 right-0 w-48 bg-gray-100 shadow-xl drop-shadow-xl rounded-lg p-3 hidden group-focus:block group-focus-within:block z-10'>
        <Link href='/account' className='block mb-2'>
          Unfollow Profile
        </Link>
        <Link href='#' className='block mb-2'>
          Bookmark Post
        </Link>
        <Link href='#' className='block  text-error-main'>
          Report Post
        </Link>
      </div>
    </button>
  );
}
