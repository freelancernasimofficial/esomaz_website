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
import { addMainCommentReply, deleteComment } from "@/actions/commentActions";
import SubmitButtonClient from "../button/SubmitButtonClient";

type Props = {
  item: any;
};

export default function SingleComment({ item }: Props) {
  const [comment, setComment] = useState<any>();
  const [enableForm, setEnableForm] = useState(false);
  const [pending, setPending] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [formStatus, setFormStatus] = useState({ status: false, message: "" });

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

  const handleReply = () => {
    setPending(true);
    addMainCommentReply({
      text: replyText,
      commentId: comment?.id,
    })
      .then((data: any) => {
        if (data.status === true) {
          setComment((prev: any) => {
            return {
              ...prev,
              Replies:
                prev?.Replies?.length > 0
                  ? [...prev?.Replies, data.comment]
                  : [data.comment],
            };
          });
          setEnableForm(false);
          setReplyText("");
        } else {
          setFormStatus(data);
        }
      })
      .catch((err) => {
        setFormStatus(err);
      })
      .finally(() => {
        setPending(false);
      });
  };

  const handleDelete = () => {
    deleteComment(comment?.id)
      .then(() => {
        setComment(null);
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
              <h4 className='font-semibold inline-block '>
                {getFullName(comment?.User)}
              </h4>
            </Link>
            <span className='block text-sm  text-gray-500 leading-3'>
              {getRelativeTime(comment?.createdAt)}
            </span>

            <div className=' mt-1 inline-block'>{comment?.text}</div>
          </div>

          <div className='flex items-center mb-2'>
            <ReactionCard
              onClick={handleReaction}
              currentReaction={comment?.myReactionType}
            />{" "}
            {comment?.totalReactions > 0 ? (
              <Link
                href={`/posts/${comment?.Post?.uuId}/comment_reactions/${comment?.id}`}
                className='ml-1.5   font-medium'
              >
                {getCompactNumber(comment?.totalReactions)} People
              </Link>
            ) : null}
            <div className='ml-6'>
              <button
                onClick={() => setEnableForm(!enableForm)}
                className='m-0 p-0 h-auto  font-medium'
              >
                Reply
              </button>
            </div>
          </div>
          {enableForm ? (
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
              {formStatus.status === false && formStatus.message.length > 0 && (
                <div className='errorCard mt-2 mb-1'>{formStatus.message}</div>
              )}
              <SubmitButtonClient
                className='btn btn-primary w-full mt-2'
                pending={pending}
                title='Reply'
                onClick={handleReply}
              />
            </div>
          ) : null}
          {
            <div>
              {" "}
              {comment?.Replies?.map((replyComment: any) => {
                return (
                  <SingleCommentReply
                    setMainComment={setComment}
                    item={replyComment}
                    key={replyComment?.id}
                  />
                );
              })}
            </div>
          }
        </div>

        <DropdownMenu tabIndex={comment?.id}>
          {comment?.userId !== comment?.currentUserId ? (
            <Link
              href={`/posts/${comment?.Post?.uuId}/report_comment/${comment?.id}`}
              className='block mb-2  font-medium  text-error-main'
            >
              Report Comment
            </Link>
          ) : null}
          {comment?.userId === comment?.currentUserId ? (
            <Link
              href={`/posts/${comment?.Post?.uuId}/edit_comment/${comment?.id}`}
              className='block mb-2 font-medium '
            >
              Edit Comment
            </Link>
          ) : null}
          {comment?.userId === comment?.currentUserId ||
          comment?.Post?.userId === comment?.currentUserId ? (
            <button
              onClick={handleDelete}
              className='block font-medium text-error-main  p-0 m-0'
            >
              Delete Comment
            </button>
          ) : null}
        </DropdownMenu>
      </div>
    </div>
  ) : null;
}
