"use client";
import IconX from "@/components/icons/IconX";
import React from "react";

type Props = {};

export default function error({}: Props) {
  return (
    <div className='p-3'>
      <div className='centerCardMobile bg-white h-40 shadow flex justify-center items-center mt-10'>
        <div className='flex flex-col items-center justify-center'>
          {" "}
          <div className='w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-red-400 text-white mb-4'>
            {" "}
            <IconX className='w-10 h-10' />
          </div>
          <h1 className=' font-medium'>Something Went Wrong</h1>
        </div>
      </div>
    </div>
  );
}
