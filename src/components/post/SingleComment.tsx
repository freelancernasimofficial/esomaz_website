import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React from "react";
import IconHorizontalDots from "../icons/IconHorizontalDots";
import Avatar from "../user/Avatar";
import FewCommentReplies from "./FewCommentReplies";
import DropdownMenu from "../dropdown/DropdownMenu";
import ReactionCard from "./ReactionCard";
import reactionAction from "@/actions/reactionAction";
import getCompactNumber from "@/library/getCompactNumber";

type Props = {
  item: any;
};

export default function SingleComment({ item }: Props) {
  const commentReactionAction = reactionAction?.bind(null, {
    itemId: item?.id,
    itemType: "comment",
  });

  return (
    <div className='mb-3'>
      <div className='flex'>
        <Avatar className='w-8 h-8' user={item?.User} />

        <div className='px-2 flex-1'>
          <div className='inline-block bg-gray-100 px-2 py-1 rounded-xl'>
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

            <div className='text-sm3 mt-1 inline-block'>{item?.text}</div>
          </div>

          <div className='flex'>
            <ReactionCard
              action={commentReactionAction}
              currentReaction={item?.myReactionType}
            />{" "}
            {item?.totalReactions > 0 ? (
              <div className='ml-1.5 mt-2 text-sm4 font-medium'>
                {getCompactNumber(item?.totalReactions)} People
              </div>
            ) : null}
          </div>
          <div className=''>
            <FewCommentReplies commentId={item.id} />
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
