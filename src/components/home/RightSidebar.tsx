import Link from "next/link";
import React from "react";
import Image from "next/image";
import getPeopleYouMayKnowAction from "@/actions/getPeopleYouMayKnowAction";
import Avatar from "../user/Avatar";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";

type Props = {};

export default async function RightSidebar({}: Props) {
  const people = await getPeopleYouMayKnowAction();

  return (
    <div className='hidden lg:flex max-w-96 w-full full-height sticky top-20  flex-col pl-6'>
      <div className='bg-white shadow p-4 rounded-lg overflow-hidden '>
        <div className='flex justify-between items-center pb-2'>
          <h2 className='font-semibold text-lg'>People You May Know</h2>
        </div>
        <div className='flex-1 w-full h-full overflow-y-scroll pb-10'>
          {people?.map((user: any, index: number) => {
            return (
              <div key={user?.uuId} className='flex justify-between mb-4'>
                <div className='flex'>
                  <div className='w-9 h-9 overflow-hidden shrink-0 rounded-full'>
                    <Avatar user={user} />
                  </div>
                  <div className='ml-2'>
                    <Link href={`/user/${getUsername(user)}`} className='block'>
                      <h4 className='font-medium text-sm2 capitalize'>
                        {getFullName(user)}
                      </h4>
                    </Link>
                    <span className='block text-sm5 text-gray-500 leading-3'>
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
