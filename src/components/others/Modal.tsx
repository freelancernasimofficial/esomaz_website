"use client";
import React, { DOMAttributes } from "react";

type Props = {
  children: any;
  onClickBackdrop?: DOMAttributes<HTMLDivElement>["onClick"];
};

export default function Modal({ children, onClickBackdrop }: Props) {
  return (
    <div className='fixed left-0 top-0 h-screen w-screen z-[100] animate-fade'>
      <div
        onClick={onClickBackdrop}
        className='bg-black bg-opacity-20 h-screen w-screen absolute left-0 top-0'
      ></div>
      <div className='centerCardSmall w-[97%] bg-white p-3 rounded-lg absolute z-50 left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4'>
        {children}
      </div>
    </div>
  );
}
