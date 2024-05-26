import getPostSharesAction from "@/actions/getPostSharesAction";
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
  const getShared = await getPostSharesAction(params?.postId);

  return (
    <div className='container'>
      <div className='centerCardSmall bg-white p-4'>
        <h1 className=' font-semibold'>
          People Who Shared ({getShared?.length})
        </h1>
        {getShared?.map((item: any, index: number) => {
          return (
            <div
              key={item?.id?.toString()}
              className='py-4 flex items-center justify-between border-b border-b-gray-100'
            >
              <div className='flex items-center'>
                {" "}
                <Avatar user={item?.User} />{" "}
                <Link
                  href={`/user/${getUsername(item?.User)}`}
                  className='ml-2 block'
                >
                  <h1 className='font-semibold  leading-none capitalize'>
                    {getFullName(item?.User)}
                  </h1>
                  <span className='font-medium  text-gray-500'>
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
