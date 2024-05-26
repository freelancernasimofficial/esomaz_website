import { getCommentReactions } from "@/actions/commentActions";
import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getUsername from "@/library/getUsername";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    commentId: string;
    reactionType: string;
  };
};

export default async function page({ params }: Props) {
  const reactions = await getCommentReactions(
    params?.commentId,
    params.reactionType,
  );

  return (
    <div className=' bg-white mt-2 rounded-lg'>
      {reactions?.map((item: any, index: number) => {
        return (
          <div
            key={item?.id?.toString()}
            className='px-2 py-1 flex items-center justify-between border-b border-b-gray-100'
          >
            <div className='flex items-center'>
              {" "}
              <Avatar user={item?.User} />{" "}
              <Link
                href={`/user/${getUsername(item?.User)}`}
                className='ml-2 block'
              >
                <h4 className='font-semibold  leading-none capitalize'>
                  {getFullName(item?.User)}
                </h4>
                <span className='font-medium text-sm  text-gray-500'>
                  @{getUsername(item?.User)}
                </span>
              </Link>
            </div>
            <div>
              <Image
                width={80}
                height={80}
                className='w-6 h-6'
                alt='reaction'
                src={`/reactions/${item?.type}.png`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
