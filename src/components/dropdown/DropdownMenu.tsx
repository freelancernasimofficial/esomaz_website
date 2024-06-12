import React from "react";
import IconHorizontalDots from "../icons/IconHorizontalDots";

type Props = {
  children: React.ReactNode;
  tabIndex?: number;
};

export default function DropdownMenu({ tabIndex, children }: Props) {
  return (
    <div
      tabIndex={tabIndex ?? -1}
      className='m-0 p-0 w-8 h-8 rounded-full focus:bg-gray-100 focus-within:bg-gray-100 hover:bg-gray-100 flex flex-col items-center justify-center relative group shrink-0 '
    >
      <IconHorizontalDots className='cursor-pointer w-5 h-5' />
      <div className='absolute text-left top-10 right-0 min-w-48 bg-gray-100 shadow-xl drop-shadow-xl rounded-lg p-3 hidden group-focus:block group-focus-within:block z-10'>
        {children}
      </div>
    </div>
  );
}
