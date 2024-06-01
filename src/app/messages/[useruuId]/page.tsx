import { getSingleUserByuuId } from "@/actions/user/userActions";
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
      <div className='h-12 bg-white border-b fixed w-full z-20'>
        <div className='container h-full'>
          <div className='h-full flex items-center'>
            <div className='flex items-center'>
              <Avatar user={friend} />{" "}
              <div className='ml-2 leading-4'>
                <div className='font-semibold text-sm'>
                  {getFullName(friend)}
                </div>
                <div className='text-xs'>Few moments ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container pt-14 pb-10 min-h-screen flex flex-col'>
        {/* {[...Array(100)].map((item: any, index: any) => {
          return <SingleUserSkeleton className='mb-8' key={index} />;
        })} */}
      </div>

      <div className='bg-white w-full fixed bottom-0'>
        <textarea
          className='w-full rounded-none h-full focus-visible:outline-none'
          placeholder='Enter Message'
          cols={10}
          rows={1}
        ></textarea>
      </div>
    </section>
  );
}
