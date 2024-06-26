import IconImagesOutline from "@/components/icons/IconImagesOutline";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import IconVideo from "../icons/IconVideo";

type Props = {
  className?: HTMLAttributes<HTMLDivElement>["className"];
};

export default function PostForm({ className }: Props) {
  return (
    <div
      className={`w-full items-center mb-4 flex  p-3 bg-white rounded-lg shadow ${
        className ?? ""
      }`}
    >
      <Link
        href='/posts/create_post'
        className='flex-1 block bg-gray-100 rounded-full  font-medium p-2 px-3'
      >
        What's on your mind?
      </Link>
      <Link href='/posts/create_post' className='svgCircleButton ml-4'>
        <IconImagesOutline className='text-green-500' />
      </Link>
      <Link href='/posts/create_video_post' className='svgCircleButton ml-4'>
        <IconVideo className='text-rose-500' />
      </Link>
    </div>
  );
}
