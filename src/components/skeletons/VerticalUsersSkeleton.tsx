import React from "react";

type Props = {};

export default function VerticalUsersSkeleton({}: Props) {
  return (
    <div className='centerCardSmall'>
      <div className='bg-white shadow p-4 rounded-lg'>
        <div className='flex flex-col w-full'>
          {[...Array(20)]?.map((item: any, index: number) => {
            return (
              <div
                key={index?.toString()}
                className='flex justify-between items-center mt-4 animate-pulse w-full'
              >
                <div className='w-9 h-9 bg-gray-200  overflow-hidden shrink-0 rounded-full'></div>
                <div className='ml-2 w-full'>
                  <div className='block bg-gray-200 h-2.5 w-40 rounded-lg'></div>
                  <div className='block  bg-gray-200 h-1.5 w-20 mt-1 rounded-lg'></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
