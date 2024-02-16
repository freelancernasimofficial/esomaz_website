import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React from "react";
import IconHorizontalDots from "../icons/IconHorizontalDots";
import Avatar from "../user/Avatar";
import FewCommentReplies from "./FewCommentReplies";

type Props = {
  item: any;
};

export default function SingleComment({ item }: Props) {
  return (
    <div className='mb-4'>
      <div className='flex justify-between'>
        <div className='flex flex-1'>
          <Avatar user={item?.User} />
          <div className='ml-2 flex-1'>
            <div>
              {" "}
              <Link href={`/user/${getUsername(item?.User)}`} className='block'>
                <h4 className='font-semibold'>{getFullName(item?.User)}</h4>
              </Link>
              <span className='block text-sm5 text-gray-500 leading-4'>
                {getRelativeTime(item?.createdAt)}
              </span>
            </div>
            <div className='mt-1 text-sm3 mb-3'>{item?.text}</div>
            <div>
              <FewCommentReplies commentId={item.id} />
            </div>
          </div>
        </div>
        <button className='svgCircleButton -mt-2'>
          <IconHorizontalDots />
        </button>
      </div>
    </div>
  );
}
