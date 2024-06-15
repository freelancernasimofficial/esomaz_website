import { getSingleUserByuuId } from "@/actions/user/userActions";
import IconSendCircle from "@/components/icons/IconSendCircle";
import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import React from "react";
import LoadMessages from "./LoadMessages";

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
        <div className='h-12 bg-slate-800 text-white border-b fixed left-0 top-14 w-full z-20 flex items-center px-4'>
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

      <LoadMessages />

      <div>
        <div className='h-12 w-full'></div>
        <div className='bg-gray-300 w-full h-12 flex items-center justify-between fixed bottom-0'>
          <textarea
            className='w-full rounded-none flex-1 h-full focus-visible:outline-none bg-transparent'
            placeholder='Enter Message'
            cols={10}
            rows={1}
          ></textarea>
          <button
            className='bg-primary-main text-white flex items-center justify-center w-12 h-full active:rounded active:scale-75 
         duration-300'
          >
            <IconSendCircle className='w-6 h-6' />
          </button>
        </div>
      </div>
    </section>
  );
}
