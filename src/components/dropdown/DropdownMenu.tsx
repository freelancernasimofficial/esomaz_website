import React from "react";
import IconHorizontalDots from "../icons/IconHorizontalDots";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

export default function DropdownMenu({ children }: Props) {
  return (
    <div
      tabIndex={-1}
      className='m-0 p-0 w-9 h-9 rounded-full focus:bg-gray-100 focus-within:bg-gray-100 hover:bg-gray-100 flex flex-col items-center justify-center relative group shrink-0 '
    >
      <IconHorizontalDots />
      <div className='absolute text-left top-10 right-0 min-w-48 bg-gray-100 shadow-xl drop-shadow-xl rounded-lg p-3 hidden group-focus:block group-focus-within:block z-10  [&_form>button]:font-weight:text-3'>
        {children}
      </div>
    </div>
  );
}
