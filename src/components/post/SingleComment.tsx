"use client";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Avatar from "../user/Avatar";
import DropdownMenu from "../dropdown/DropdownMenu";
import ReactionCard from "./ReactionCard";
import getCompactNumber from "@/library/getCompactNumber";
import reactionAction from "@/actions/reactionAction";
import SingleCommentReply from "./SingleCommentReply";
import CommentSkeleton from "../skeletons/CommentSkeleton";

type Props = {
  item: any;
  handleDelete: (commentId: any) => void;
  postId: any;
};

export default function SingleComment({ handleDelete, item, postId }: Props) {
  const [comment, setComment] = useState<any>();

  const handleReaction = (reactionType: string) => {
    reactionAction({ itemId: comment?.id, itemType: "comment", reactionType })
      .then(() => {
        setComment((prev: any) => {
          if (reactionType === "removeReaction") {
            return {
              ...prev,
              myReactionType: null,
              totalReactions: prev.totalReactions - 1,
            };
          } else {
            return {
              ...prev,
              myReactionType: reactionType,
              totalReactions:
                prev.myReactionType === null
                  ? prev.totalReactions + 1
                  : prev.totalReactions,
            };
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setComment(item);
  }, [item]);

  return comment?.id ? (
    <div className='mb-3'>
      <div className='flex'>
        <Avatar className='w-8 h-8' user={comment?.User} />

        <div className='px-2 flex-1'>
          <div className='inline-block bg-gray-100 px-2 py-1 rounded-xl'>
            <Link
              href={`/user/${getUsername(comment?.User)}`}
              className='inline-block'
            >
              <h4 className='font-semibold inline-block text-sm4'>
                {getFullName(comment?.User)}
              </h4>
            </Link>
            <span className='block text-sm5 text-gray-500 leading-3'>
              {getRelativeTime(comment?.createdAt)}
            </span>

            <div className='text-sm4 mt-1 inline-block'>{comment?.text}</div>
          </div>

          <div className='flex items-center mb-2'>
            <ReactionCard
              onClick={handleReaction}
              currentReaction={comment?.myReactionType}
            />{" "}
            {comment?.totalReactions > 0 ? (
              <Link
                href={`/posts/${postId}/comment_reactions/${comment?.id}`}
                className='ml-1.5  text-sm4 font-medium'
              >
                {getCompactNumber(comment?.totalReactions)} People
              </Link>
            ) : null}
            <div className='ml-6'>
              <button className='m-0 p-0 h-auto text-sm4 font-medium'>
                Reply
              </button>
            </div>
          </div>
          <div>
            {" "}
            {comment?.Replies?.map((replyComment: any) => {
              return (
                <SingleCommentReply
                  handleDelete={handleDelete}
                  key={replyComment?.id}
                  item={replyComment}
                  postId={postId}
                />
              );
            })}
          </div>
        </div>

        <DropdownMenu tabIndex={comment?.id}>
          {comment?.userId !== comment?.currentUserId ? (
            <Link
              href={`/posts/${postId}/report_comment/${comment?.id}`}
              className='block mb-2  font-medium text-sm3 text-error-main'
            >
              Report Comment
            </Link>
          ) : null}
          {comment?.userId === comment?.currentUserId ? (
            <Link
              href={`/posts/${postId}/edit_comment/${comment?.id}`}
              className='block mb-2 font-medium text-sm3'
            >
              Edit Comment
            </Link>
          ) : null}
          {comment?.userId === comment?.currentUserId ||
          comment?.postOwnerId === comment?.currentUserId ? (
            <button
              onClick={() => handleDelete(comment?.id)}
              className='block font-medium text-error-main text-sm3 p-0 m-0'
            >
              Delete Comment
            </button>
          ) : null}
        </DropdownMenu>
      </div>
    </div>
  ) : (
    <CommentSkeleton />
  );
}
