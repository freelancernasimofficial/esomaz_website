import SingleUserSkeleton from "@/components/skeletons/SingleUserSkeleton";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <section className='bg-white'>
      <div className='w-full'>
        <h1 className='font-bold w-full fixed h-10 flex items-center px-4 shadow z-20 bg-white'>
          Chats
        </h1>
        <div className='h-10 w-full'></div>
      </div>
      <div className='p-4'>
        {[...Array(100)].map((item: any, index: any) => {
          return <SingleUserSkeleton className='mb-2' key={index} />;
        })}
      </div>
    </section>
  );
}
