import getUsername from "@/library/getUsername";
import Link from "next/link";
import React from "react";
import getFriendsByUserIdAction from "@/actions/user/getFriendsAction";

type Props = {
  user: any;
};

export default async function FriendsCard({ user }: Props) {
  const friends = await getFriendsByUserIdAction({
    userId: user?.id,
    limitFrom: 0,
    limitTo: 5,
  });

  return (
    <div className='w-full p-4 my-4 rounded-lg bg-white shadow hidden md:block'>
      <div className='mb-2 flex justify-between'>
        <h1 className='font-bold '>Friends </h1>
        <Link
          className='text-primary-main '
          href={`/user/${getUsername(user)}/friends`}
        >
          View All
        </Link>
      </div>
      <div className='flex flex-col w-full'>
        {friends?.map((item: any, index: number) => {
          return item;
        })}
      </div>
    </div>
  );
}
