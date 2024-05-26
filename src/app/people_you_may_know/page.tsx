import Link from "next/link";
import React from "react";
import getPeopleYouMayKnowAction from "@/actions/getPeopleYouMayKnowAction";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Avatar from "@/components/user/Avatar";

type Props = {};

export default async function page({}: Props) {
  const people = await getPeopleYouMayKnowAction();

  return (
    <div className='container mb-4'>
      <div className='centerCardSmall bg-white shadow p-4 rounded-lg overflow-hidden '>
        <div className='flex justify-between items-center pb-2'>
          <h2 className='font-semibold text-lg'>People You May Know</h2>
        </div>
        <div className='flex-1 w-full h-full overflow-y-scroll'>
          {people?.map((user: any, index: number) => {
            return (
              <div key={user?.uuId} className='flex justify-between mb-4'>
                <div className='flex'>
                  <div className='w-9 h-9 overflow-hidden shrink-0 rounded-full'>
                    <Avatar user={user} />
                  </div>
                  <div className='ml-2'>
                    <Link href={`/user/${getUsername(user)}`} className='block'>
                      <h4 className='font-medium  capitalize'>
                        {getFullName(user)}
                      </h4>
                    </Link>
                    <span className='block  text-gray-500 leading-3'>
                      Joined {getRelativeTime(user?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
