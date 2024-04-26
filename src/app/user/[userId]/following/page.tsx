import getFollowingsByUserIdAction from "@/actions/getFollowingsByUserIdAction";
import getSingleUserByuuId from "@/actions/getSingleUserByuuId";
import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getSubtitle from "@/library/getSubtitle";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    userId: string;
  };
};

export default async function page({ params }: Props) {
  const user = await getSingleUserByuuId(params.userId);
  const following = await getFollowingsByUserIdAction(user?.id);

  return (
    <div className='centerCard'>
      <div className='bg-white shadow p-4 rounded-lg mb-8'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-xl'>
            Following ({following?.length ? following?.length : 0})
          </h2>
        </div>
        <div className='flex flex-col w-full'>
          {following?.map((item: any, index: number) => {
            return (
              <div
                key={item?.id?.toString()}
                className='flex justify-between mt-4'
              >
                <div className='flex'>
                  <div className='w-9 h-9 overflow-hidden shrink-0 rounded-full'>
                    <Avatar user={item?.User} />
                  </div>
                  <div className='ml-2'>
                    <Link
                      href={`/user/${getUsername(item?.User)}`}
                      className='block'
                    >
                      <h4 className='font-medium text-sm2'>
                        {getFullName(item?.User)}
                      </h4>
                    </Link>
                    <span className='block text-sm5 text-gray-500 leading-3'>
                      {getSubtitle(item?.User)}
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
