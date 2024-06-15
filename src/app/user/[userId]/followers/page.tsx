import {
  getSingleUserByuuId,
  getTotalFollowersByUserId,
} from "@/actions/user/userActions";
import React from "react";
import LoadFollowers from "./LoadFollowers";

type Props = {
  params: {
    userId: string;
  };
};

export default async function page({ params }: Props) {
  const user = await getSingleUserByuuId(params.userId);
  const totalFollowers = await getTotalFollowersByUserId(user?.id);

  return (
    <div className='centerCard'>
      <div className='bg-white shadow p-4 rounded-lg mb-8'>
        <div className='flex justify-between'>
          <h1 className='font-semibold '>Followers ({totalFollowers})</h1>
        </div>
        <div className='flex flex-col w-full'>
          <LoadFollowers userId={user?.id} />
        </div>
      </div>
    </div>
  );
}
