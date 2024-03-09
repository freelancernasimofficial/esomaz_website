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
import addFollowAction, { unFollowAction } from "@/actions/addFollowAction";
import auth from "@/library/auth";
import deleteCommentAction from "@/actions/deleteCommentAction";

type Props = {
  item: any;
  params: any;
};

export default async function SingleReplyComment({ item, params }: Props) {
  const currentUser = await auth();
  const commentReactionAction = reactionAction?.bind(null, {
    itemId: item?.id,
    itemType: "comment",
  });

  const bindReplyCommentReplyButton = replyCommentReplyButtonAction?.bind(
    null,
    item?.id,
  );

  const activeReplyCommentId = CookieStore.getState("rcr_id");
  const bindFollowUser = addFollowAction?.bind(null, item?.userId);
  const bindUnFollowFollowUser = unFollowAction?.bind(null, item?.userId);
  const bindDeleteAction = deleteCommentAction?.bind(null, item?.id);

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
          {item?.userId !== currentUser?.id ? (
            <React.Fragment>
              {item?.isHeFollowing && item?.isMeFollowing ? (
                <form action={bindUnFollowFollowUser}>
                  <button
                    type='submit'
                    className='block mb-2 text-success-main hover:!text-primary-main p-0 font-medium text-sm3'
                  >
                    You are Followers
                  </button>
                </form>
              ) : item?.isHeFollowing && !item?.isMeFollowing ? (
                <form action={bindFollowUser}>
                  <button
                    type='submit'
                    className='block text-success-main mb-2 hover:!text-primary-main p-0 font-medium text-sm3'
                  >
                    Follow Back
                  </button>
                </form>
              ) : item?.isMeFollowing && !item.isHeFollowing ? (
                <form action={bindUnFollowFollowUser}>
                  <button
                    type='submit'
                    className='block text-info-main mb-2 hover:!text-primary-main p-0 font-medium text-sm3'
                  >
                    Following
                  </button>
                </form>
              ) : (
                <form action={bindFollowUser}>
                  <button
                    type='submit'
                    className='block mb-2 hover:!text-primary-main p-0 font-medium text-sm3'
                  >
                    Follow Profile
                  </button>
                </form>
              )}
              <Link
                href={`/posts/${params?.postId}/report_comment/${item?.id}`}
                className='block mb-2  font-medium text-sm3 text-error-main'
              >
                Report Comment
              </Link>
            </React.Fragment>
          ) : null}
          {item?.userId === currentUser?.id ? (
            <Link href='#' className='block mb-2 font-medium text-sm3'>
              Edit Comment
            </Link>
          ) : null}
          {item?.userId === currentUser?.id ||
          item?.postOwnerId === currentUser?.id ? (
            <form action={bindDeleteAction}>
              <button
                type='submit'
                className='block font-medium text-error-main text-sm3 p-0 m-0'
              >
                Delete Comment
              </button>
            </form>
          ) : null}
        </DropdownMenu>
      </div>
    </div>
  );
}
