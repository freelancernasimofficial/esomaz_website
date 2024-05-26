import { getPostShares } from "@/actions/postActions";
import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    postId: string;
  };
};

export default async function page({ params }: Props) {
  const getShared = await getPostShares(params?.postId);

  return (
    <div className='container'>
      <div className='centerCardSmall bg-white p-4'>
        <h2 className='font-semibold mb-2'>
          People Who Shared ({getShared?.length})
        </h2>
        {getShared?.map((item: any, index: number) => {
          return (
            <div
              key={item?.id?.toString()}
              className='py-1 flex items-center justify-between border-b border-b-gray-100'
            >
              <div className='flex items-center'>
                {" "}
                <Avatar user={item?.User} />{" "}
                <Link
                  href={`/user/${getUsername(item?.User)}`}
                  className='ml-2 block'
                >
                  <h3 className='font-semibold  leading-none capitalize'>
                    {getFullName(item?.User)}
                  </h3>
                  <span className=' text-sm  text-gray-500'>
                    {getRelativeTime(item?.createdAt)}
                  </span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
