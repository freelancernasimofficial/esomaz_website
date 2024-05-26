import getFullName from "@/library/getFullName";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React from "react";
import Avatar from "./Avatar";
import getFriendsByUserIdAction from "@/actions/getFriendsByUserIdAction";

type Props = {
  user: any;
};

export default async function FriendsCard({ user }: Props) {
  const friends = await getFriendsByUserIdAction(user?.id, 5);

  return (
    <div className='w-full p-4 my-4 rounded-lg bg-white shadow hidden md:block'>
      <div className='mb-2 flex justify-between'>
        <h2 className='font-bold text-xl'>Friends</h2>
        <Link
          className='text-primary-main '
          href={`/user/${getUsername(user)}/friends`}
        >
          View All
        </Link>
      </div>
      <div className='flex flex-col w-full'>
        {friends?.map((item: any, index: number) => {
          return (
            <div key={item?.id.toString()} className='flex my-2'>
              <Avatar user={item?.Friend} />
              <div className='ml-2'>
                <Link
                  href={`/user/${getUsername(item?.Friend)}`}
                  className='block'
                >
                  <h4 className='font-medium '>{getFullName(item?.Friend)}</h4>
                </Link>
                <span className='block  text-gray-500 leading-3 lowercase'>
                  @{getUsername(item?.Friend)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
