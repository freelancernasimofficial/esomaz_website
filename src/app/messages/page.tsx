import SingleUserSkeleton from "@/components/skeletons/SingleUserSkeleton";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <section>
      <div className='bg-white h-10 fixed w-full border-b z-20'>
        <div className='container h-full flex items-center'>
          <h1 className='font-semibold'>Chats</h1>
        </div>
      </div>
      <div className='pt-14 pb-10 bg-white'>
        <div className='container'>
          {[...Array(100)].map((item: any, index: any) => {
            return <SingleUserSkeleton className='mb-2' key={index} />;
          })}
        </div>
      </div>
    </section>
  );
}
