import IconImagesOutline from "@/components/icons/IconImagesOutline";
import IconVideo from "@/components/icons/IconVideo";
import React, { HTMLAttributes } from "react";

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
      <div className='flex-1'>
        <div className='bg-gray-100 rounded-full text-sm3 font-medium p-2.5'>
          What's on your mind?
        </div>
      </div>
      <button className='svgCircleButton ml-4'>
        <IconImagesOutline className='text-green-500' />
      </button>
      <button className='svgCircleButton ml-4'>
        <IconVideo className='text-rose-500' />
      </button>
    </div>
  );
}
