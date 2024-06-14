"use client";
import React, { DOMAttributes, HTMLAttributes } from "react";

type Props = {
  children: any;
  onClickBackdrop?: DOMAttributes<HTMLDivElement>["onClick"];
  className?: HTMLAttributes<HTMLDivElement>["className"];
};

export default function Modal({ children, onClickBackdrop, className }: Props) {
  return (
    <div className='fixed left-0 top-0 h-screen w-screen z-[100] animate-fade'>
      <div
        onClick={onClickBackdrop}
        className='bg-black bg-opacity-50 h-screen w-screen absolute left-0 top-0'
      ></div>
      <div
        className={`centerCardSmall w-[94%] bg-white p-4 rounded-lg absolute z-50 left-2/4 -translate-x-2/4 top-2/4 -translate-y-2/4 ${
          className ? className : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
}
