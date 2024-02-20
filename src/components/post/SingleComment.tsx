import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React from "react";
import IconHorizontalDots from "../icons/IconHorizontalDots";
import Avatar from "../user/Avatar";
import FewCommentReplies from "./FewCommentReplies";
import DropdownMenu from "../dropdown/DropdownMenu";

type Props = {
  item: any;
};

export default function SingleComment({ item }: Props) {
  return (
    <div className='mb-2'>
      <div className='flex justify-between'>
        <div className='flex flex-1'>
          <Avatar className='w-8 h-8' user={item?.User} />
          <div className='ml-2 flex-1'>
            <div>
              <Link
                href={`/user/${getUsername(item?.User)}`}
                className='inline-block'
              >
                <h4 className='font-semibold inline-block text-sm4'>
                  {getFullName(item?.User)}
                </h4>
              </Link>
              <span className='block text-sm5 text-gray-500 leading-3'>
                {getRelativeTime(item?.createdAt)}
              </span>
            </div>
            <div className='mt-1 text-sm3 mb-3 bg-gray-100 p-2 rounded-lg inline-block'>
              {item?.text}
            </div>
            <div>
              <FewCommentReplies commentId={item.id} />
            </div>
          </div>
        </div>
        <DropdownMenu>
          <Link href='/account' className='block mb-2'>
            Unfollow Profile
          </Link>
          <Link href='#' className='block mb-2'>
            Bookmark Post
          </Link>
          <Link href='#' className='block  text-error-main'>
            Report Post
          </Link>
        </DropdownMenu>
      </div>
    </div>
  );
}
