import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React from "react";
import DropdownMenu from "../dropdown/DropdownMenu";
import Avatar from "../user/Avatar";
import ReactionCard from "./ReactionCard";
import reactionAction from "@/actions/reactionAction";
import CookieStore from "@/library/CookieStore";
import replyCommentReplyButtonAction from "@/actions/replyCommentReplyButtonAction";
import getCompactNumber from "@/library/getCompactNumber";
import ReplyCommentReplyForm from "./ReplyCommentReplyForm";

type Props = {
  item: any;
};

export default function SingleReplyComment({ item }: Props) {
  const commentReactionAction = reactionAction?.bind(null, {
    itemId: item?.id,
    itemType: "comment",
  });

  const bindReplyCommentReplyButton = replyCommentReplyButtonAction?.bind(
    null,
    item?.id,
  );

  const activeReplyCommentId = CookieStore.getState("rcr_id");

  return (
    <div key={item?.uuId} className='my-2'>
      <div className='flex justify-between'>
        <div className='flex w-full'>
          <Avatar className='w-6 h-6' user={item?.User} />
          <div className='mx-2 w-full'>
            <div className='inline-block bg-gray-100 px-2 py-1.5 rounded-xl'>
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
              <div className='mt-1 text-sm3'>
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
            </div>
            {activeReplyCommentId === item?.id ? (
              <ReplyCommentReplyForm item={item} />
            ) : null}
            <div className='flex items-center'>
              <ReactionCard
                action={commentReactionAction}
                currentReaction={item?.myReactionType}
              />{" "}
              {item?.totalReactions > 0 ? (
                <div className='text-sm4 ml-1.5 font-medium'>
                  {getCompactNumber(item?.totalReactions)} People
                </div>
              ) : null}
              <form action={bindReplyCommentReplyButton} className='ml-6'>
                <button
                  className='m-0 p-0 h-auto text-sm4 font-medium'
                  type='submit'
                >
                  Reply
                </button>
              </form>
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
