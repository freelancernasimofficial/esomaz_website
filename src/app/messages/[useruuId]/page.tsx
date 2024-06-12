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
    <section className='bg-white'>
      <div className='h-12 bg-blue-700 text-white border-b fixed w-full z-20 flex items-center px-3'>
        <div className='flex items-center'>
          <Avatar className='border border-white' user={friend} />{" "}
          <div className='ml-2 leading-4'>
            <div className='font-semibold text-sm'>{getFullName(friend)}</div>
            <div className='text-xs'>Few moments ago</div>
          </div>
        </div>
      </div>

      <div className='container pt-16 pb-10 min-h-screen flex flex-col'>
        {[...Array(50)].map((item: any, index: any) => {
          if (index % 2 === 0) {
            return (
              <div className='flex w-full' key={index}>
                {" "}
                <div className='mr-2 shrink-0'>
                  <Avatar className='!w-5 !h-5' user={friend} />
                </div>
                <div className='mb-4 w-8/12 bg-gray-200 rounded-lg p-2 shrink-0'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus odit odio dignissimos nesciunt doloribus
                  quibusdam itaque deserunt incidunt deleniti! Reiciendis
                  eligendi impedit aut eum laudantium veritatis in dignissimos
                  repellat illo. <h1 className='font-bold'>{index}</h1>
                </div>
              </div>
            );
          } else {
            return (
              <div className='flex w-full justify-end' key={index}>
                {" "}
                <div className='mb-4 w-8/12 bg-gray-200 rounded-lg p-2 shrink-0'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Voluptatibus odit odio dignissimos nesciunt doloribus
                  quibusdam itaque deserunt incidunt deleniti! Reiciendis
                  eligendi impedit aut eum laudantium veritatis in dignissimos
                  repellat illo. <h1 className='font-bold'>{index}</h1>
                </div>{" "}
                <div className='ml-2 shrink-0'>
                  <Avatar className='!w-5 !h-5' user={friend} />
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
