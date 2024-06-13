import PageTitle from "@/components/layout/PageTitle";
import SingleUserSkeleton from "@/components/skeletons/SingleUserSkeleton";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <section className='bg-white'>
      <PageTitle title='Chats' />
      <div className='p-4'>
        {[...Array(100)].map((item: any, index: any) => {
          return <SingleUserSkeleton className='mb-2' key={index} />;
        })}
      </div>
    </section>
  );
}
