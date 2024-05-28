import React from "react";

type Props = {
  className?: string;
};

export default function SingleUserSkeleton({ className }: Props) {
  return (
    <div
      className={`flex justify-between items-center animate-pulse w-full ${
        className ? className : ""
      }`}
    >
      <div className='w-9 h-9 bg-gray-200  overflow-hidden shrink-0 rounded-full'></div>
      <div className='ml-2 w-full'>
        <div className='block bg-gray-200 h-2.5 w-40 rounded-lg'></div>
        <div className='block  bg-gray-200 h-1.5 w-20 mt-1 rounded-lg'></div>
      </div>
    </div>
  );
}
