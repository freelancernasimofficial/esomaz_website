import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Avatar from "../user/Avatar";
import DropdownMenu from "../dropdown/DropdownMenu";
import ReactionCard from "./ReactionCard";
import getCompactNumber from "@/library/getCompactNumber";

import {
  addReplyCommentReply,
  deleteComment,
  editComment,
} from "@/actions/post/commentActions";
import SubmitButtonClient from "../button/SubmitButtonClient";
import Modal from "../others/Modal";
import { reactionAction } from "@/actions/post/postActions";

type Props = {
  item: any;
  setMainComment: any;
};

export default function SingleCommentReply({ item, setMainComment }: Props) {
  const [comment, setComment] = useState<any>();
  const [enableForm, setEnableForm] = useState(false);
  const [pending, setPending] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [formStatus, setFormStatus] = useState({
    status: false,
    message: "",
  });
  const [enableEdit, setEnableEdit] = useState(false);
  const [editCommentText, setEditCommentText] = useState("");
  const [editFormStatus, setEditFormStatus] = useState({
    status: false,
    message: "",
  });

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

  const handleReplyAction = () => {
    setPending(true);
    addReplyCommentReply({
      text: replyText,
      commentId: comment?.id,
    })
      .then((data: any) => {
        if (data.status === true) {
          setMainComment((prev: any) => {
            return {
              ...prev,
              Replies: [...prev?.Replies, data.comment],
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
    const isConfirm = confirm("Are you sure?");
    if (isConfirm) {
      deleteComment(comment?.id)
        .then(() => {
          setComment(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEdit = () => {
    editComment({ commentId: comment?.id, text: editCommentText })
      .then((data) => {
        if (data.status === true) {
          setEnableEdit(false);
          setComment((prev: any) => {
            return { ...prev, text: editCommentText };
          });
        }
        setEditFormStatus(data);
      })
      .catch((err) => {
        setEditFormStatus(err);
      })
      .finally(() => {
        setPending(false);
      });
  };

  useEffect(() => {
    setComment(item);
    setEditCommentText(item?.text);
  }, [item]);

  return comment?.id ? (
    <div className='mb-3'>
      {enableEdit === true && (
        <Modal onClickBackdrop={() => setEnableEdit(false)}>
          <h3 className='font-semibold'>Edit Comment</h3>
          <textarea
            className='mt-3 w-full rounded p-2 bg-gray-100 font-medium '
            name='comment'
            id=''
            cols={30}
            rows={5}
            onChange={(e) => setEditCommentText(e.target.value)}
            value={editCommentText}
            placeholder='Edit comment...'
          ></textarea>

          {editFormStatus.status === false &&
            editFormStatus.message.length > 0 && (
              <div className='errorCard mt-2 mb-2'>
                {editFormStatus.message}
              </div>
            )}
          <SubmitButtonClient
            onClick={handleEdit}
            pending={pending}
            className='w-full btn btn-primary mt-2'
            title='Edit Comment'
          />
        </Modal>
      )}
      <div className='flex'>
        <Avatar className='!w-7 !h-7' user={comment?.User} />

        <div className='px-2 flex-1'>
          <div className='inline-block bg-gray-100 px-2 py-1 rounded-xl'>
            <Link
              href={`/user/${getUsername(comment?.User)}`}
              className='inline-block font-medium'
            >
              {getFullName(comment?.User)}
            </Link>
            <span className='block text-xs  text-gray-500 leading-3'>
              {getRelativeTime(comment?.createdAt)}
            </span>

            <div className='mt-1 inline-block'>
              {comment?.targetedComment ? (
                <Link
                  href={`/user/${getUsername(comment?.targetedComment?.User)}`}
                  className='mr-1 text-primary-main '
                >
                  {getFullName(comment?.targetedComment?.User)}
                </Link>
              ) : null}
              {comment?.text}
            </div>
          </div>

          <div className='flex items-center'>
            <ReactionCard
              onClick={handleReaction}
              currentReaction={comment?.myReactionType}
            />{" "}
            {comment?.totalReactions > 0 ? (
              <Link
                href={`/posts/${comment?.Post?.uuId}/comment_reactions/${comment?.id}/all`}
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
                onClick={handleReplyAction}
              />
            </div>
          ) : null}
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
            <button
              onClick={() => setEnableEdit(true)}
              className='block mb-2 font-medium '
            >
              Edit Comment
            </button>
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
