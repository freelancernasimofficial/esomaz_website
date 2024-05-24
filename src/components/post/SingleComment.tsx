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
import { addMainCommentReply, deleteComment } from "@/actions/commentActions";

type Props = {
  item: any;
  handleDelete: (commentId: any) => void;
  postId: any;
  setCurrentReplyCommentId: any;
  currentReplyCommentId: any;
};

export default function SingleComment({
  handleDelete,
  item,
  postId,
  setCurrentReplyCommentId,
  currentReplyCommentId,
}: Props) {
  const [comment, setComment] = useState<any>();
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [currentReplyComment, setCurrentReplyComment] = useState<any>();
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

  const handleReplyCommentDelete = (commentId: number) => {
    if (commentId) {
      deleteComment(commentId)
        .then(() => {
          const filterComments = comment?.Replies?.filter(
            (reply: any) => reply?.id !== commentId,
          );
          setComment((prev: any) => {
            return { ...prev, Replies: filterComments };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleReplyAction = () => {
    setIsReplying(true);
    addMainCommentReply({
      text: replyText,
      commentId: comment?.id,
    })
      .then((data) => {
        setComment((prev: any) => {
          return {
            ...prev,
            Replies: prev?.Replies?.length ? [...prev?.Replies, data] : [data],
          };
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsReplying(false);
        setReplyText("");
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
              <button
                onClick={() => setCurrentReplyCommentId(comment?.id)}
                className='m-0 p-0 h-auto text-sm4 font-medium'
              >
                Reply
              </button>
            </div>
          </div>
          {currentReplyCommentId === comment?.id ? (
            <div className='my-2'>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                name='comment'
                placeholder='Enter reply'
                id=''
                cols={30}
                className='w-full bg-gray-100 rounded-lg p-2 block'
                rows={2}
              ></textarea>
              {isReplying === true ? (
                <button className='btn btn-primary w-full mt-2'>
                  Replying
                </button>
              ) : (
                <button
                  onClick={handleReplyAction}
                  className='btn btn-primary w-full mt-2'
                >
                  Reply
                </button>
              )}
            </div>
          ) : null}
          <div>
            {" "}
            {comment?.Replies?.map((replyComment: any) => {
              return (
                <SingleCommentReply
                  setMainComment={setComment}
                  currentReplyComment={currentReplyComment}
                  setCurrentReplyComment={setCurrentReplyComment}
                  handleDelete={handleReplyCommentDelete}
                  item={replyComment}
                  postId={postId}
                  key={replyComment?.id}
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
