import {
  getSingleUserByuuId,
  getTotalFollowingByUserId,
} from "@/actions/user/userActions";

import React from "react";
import LoadFollowings from "./LoadFollowing";

type Props = {
  params: {
    userId: string;
  };
};

export default async function page({ params }: Props) {
  const user = await getSingleUserByuuId(params.userId);
  const totalFollowing = await getTotalFollowingByUserId(user?.id);

  return (
    <div className='centerCard'>
      <div className='bg-white shadow p-4 rounded-lg mb-8'>
        <div className='flex justify-between'>
          <h1 className='font-semibold'>Following ({totalFollowing})</h1>
        </div>
        <div className='flex flex-col w-full'>
          <LoadFollowings userId={user?.id} />
        </div>
      </div>
    </div>
  );
}
