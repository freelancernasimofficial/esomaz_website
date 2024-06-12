import { getSingleUserByuuId } from "@/actions/user/userActions";
import IconSendCircle from "@/components/icons/IconSendCircle";
import SingleUserSkeleton from "@/components/skeletons/SingleUserSkeleton";
import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getUsername from "@/library/getUsername";
import React from "react";

type Props = {
  params: {
    useruuId: any;
  };
};

export default async function page({ params }: Props) {
  const friend = await getSingleUserByuuId(params.useruuId);

  return (
    <section className='bg-white w-screen'>
      <div>
        <div className='h-12 bg-blue-700 text-white border-b fixed left-0 top-14 w-full z-20 flex items-center px-4'>
          <div className='flex items-center'>
            <Avatar className='border border-white' user={friend} />{" "}
            <div className='ml-2 leading-4'>
              <div className='font-semibold text-sm'>{getFullName(friend)}</div>
              <div className='text-xs'>Few moments ago</div>
            </div>
          </div>
        </div>
        <div className='h-12 w-full'></div>
      </div>

      <div className='p-4'>
        {[...Array(50)].map((item: any, index: any) => {
          if (index % 2 === 0) {
            return (
              <div className='w-full mb-6 flex' key={index}>
                <div className='bg-gray-200 inline-block rounded-lg p-2 shrink-0 max-w-[70%]'>
                  Lorem <span className='font-bold'>{index}</span>
                </div>
              </div>
            );
          } else {
            return (
              <div className='w-full mb-6 flex justify-end' key={index}>
                <div className='bg-blue-700 text-white inline-block rounded-lg p-2 shrink-0 max-w-[70%]'>
                  Lorem <span className='font-bold'>{index}</span>
                </div>
              </div>
            );
          }
        })}
      </div>

      <div className='bg-gray-300 w-full flex items-center justify-between fixed bottom-0'>
        <textarea
          className='w-full rounded-none flex-1 h-full focus-visible:outline-none bg-transparent'
          placeholder='Enter Message'
          cols={10}
          rows={1}
        ></textarea>
        <button
          className='bg-blue-700 text-white flex items-center justify-center w-16 h-12 active:rounded active:scale-75 
         duration-300'
        >
          <IconSendCircle className='w-7 h-7' />
        </button>
      </div>
    </section>
  );
}
