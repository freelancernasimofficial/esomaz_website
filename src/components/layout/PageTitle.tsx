import React from "react";

type Props = {
  title: string;
  children?: any;
};

export default function PageTitle({ title, children }: Props) {
  return (
    <div className='w-screen'>
      <div className='flex items-center justify-between bg-white shadow fixed w-full h-10 px-3 z-20'>
        <h1 className='font-semibold'>{title}</h1> {children}
      </div>
      <div className='h-10 w-full'></div>
    </div>
  );
}
