import React from "react";
import SubmitButton from "../button/SubmitButton";
import replyCommentReplyAction from "@/actions/replyCommentReplyAction";

type Props = {
  item: any;
};

export default function ReplyCommentReplyForm({ item }: Props) {
  const bindReplyCommentReply = replyCommentReplyAction?.bind(null, {
    postId: item?.postId,
    parentCommentId: item?.parentId,
    targetedCommentId: item.id,
  });

  return (
    <form action={bindReplyCommentReply} className='my-2'>
      <textarea
        name='comment'
        placeholder='Enter reply'
        id=''
        cols={30}
        className='w-full bg-gray-100 rounded-lg p-2 block'
        rows={2}
      ></textarea>
      <SubmitButton title='Reply' className='btn btn-primary w-full mt-2' />
    </form>
  );
}
