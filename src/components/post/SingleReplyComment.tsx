import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React from "react";
import DropdownMenu from "../dropdown/DropdownMenu";
import Avatar from "../user/Avatar";
import ReactionCard from "./ReactionCard";
import reactionAction from "@/actions/reactionAction";

type Props = {
  item: any;
};

export default function SingleReplyComment({ item }: Props) {
  const commentReactionAction = reactionAction?.bind(null, {
    itemId: item?.id,
    itemType: "comment",
  });

  return (
    <div key={item?.uuId} className='my-1'>
      <div className='flex justify-between'>
        <div className='flex'>
          <Avatar className='w-8 h-8' user={item?.User} />
          <div className='ml-2'>
            <div>
              {" "}
              <Link
                href={`/user/${getUsername(item?.User)}`}
                className='inline-block text-sm4'
              >
                <h4 className='font-semibold inline-block'>
                  {getFullName(item?.User)}
                </h4>
              </Link>
              <span className='block text-sm5 text-gray-500 leading-3'>
                {getRelativeTime(item?.createdAt)}
              </span>
            </div>
            <div className='mt-1 text-sm3 bg-gray-100 p-2 rounded-lg inline-block'>
              {item?.targetedComment ? (
                <Link
                  href={`/user/${getUsername(item?.targetedComment?.User)}`}
                  className='font-semibold mr-1 text-primary-main'
                >
                  {getFullName(item?.targetedComment?.User)}
                </Link>
              ) : null}

              {item?.text}
            </div>
            <div className='flex items-center'>
              <ReactionCard
                action={commentReactionAction}
                currentReaction={item?.myReactionType}
              />{" "}
              {item?.totalReactions > 0 ? (
                <div className='text-sm4 ml-1.5 font-medium mt-1'>
                  {item?.totalReactions} People
                </div>
              ) : null}
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
