import React from "react";
import LoadFriends from "./LoadFriends";
import {
  getSingleUserByuuId,
  getTotalFriendsByUserId,
} from "@/actions/user/userActions";

type Props = {
  params: {
    userId: string;
  };
};

export default async function page({ params }: Props) {
  const user = await getSingleUserByuuId(params.userId);
  const totalFriends = await getTotalFriendsByUserId(user?.id);

  return (
    <div className='centerCard'>
      <div className='bg-white shadow p-4 rounded-lg mb-8'>
        <div className='flex justify-between'>
          <h1 className='font-semibold '>Friends ({totalFriends})</h1>
        </div>
        <div className='flex flex-col w-full'>
          <LoadFriends userId={user?.id} />
        </div>
      </div>
    </div>
  );
}
