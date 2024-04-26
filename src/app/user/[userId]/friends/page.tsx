import getFriendsByUserIdAction from "@/actions/getFriendsByUserIdAction";
import getSingleUserByuuId from "@/actions/getSingleUserByuuId";
import Avatar from "@/components/user/Avatar";
import ProfileCard from "@/components/user/ProfileCard";
import getFullName from "@/library/getFullName";
import getSubtitle from "@/library/getSubtitle";
import getUsername from "@/library/getUsername";
import Model from "@/model/Model";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    userId: string;
  };
};

export default async function page({ params }: Props) {
  const user = await getSingleUserByuuId(params.userId);

  const friends = await getFriendsByUserIdAction(user?.id);

  return (
    <div className='centerCard'>
      <div className='bg-white shadow p-4 rounded-lg mb-8'>
        <div className='flex justify-between'>
          <h2 className='font-bold text-xl'>
            Friends ({friends?.length ? friends?.length : 0})
          </h2>
        </div>
        <div className='flex flex-col w-full'>
          {friends?.map((item: any, index: number) => {
            return (
              <div
                key={item?.id?.toString()}
                className='flex justify-between mt-4'
              >
                <div className='flex'>
                  <div className='w-9 h-9 overflow-hidden shrink-0 rounded-full'>
                    <Avatar user={item?.Friend} />
                  </div>
                  <div className='ml-2'>
                    <Link
                      href={`/user/${getUsername(item?.Friend)}`}
                      className='block'
                    >
                      <h4 className='font-medium text-sm2'>
                        {getFullName(item?.Friend)}
                      </h4>
                    </Link>
                    <span className='block text-sm5 text-gray-500 leading-3'>
                      {getSubtitle(item?.Friend)}
                    </span>
                  </div>
                </div>
                <button className='btn btn-error-transparent'>Unfriend</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
