import React from "react";
import SubmitButton from "../button/SubmitButton";
import mainCommentReplyAction from "@/actions/mainCommentReplyAction";

type Props = {
  item: any;
};

export default function MainCommentReply({ item }: Props) {
  const bindMainCommentReply = mainCommentReplyAction?.bind(null, {
    postId: item?.postId,
    commentId: item?.id,
  });

  return (
    <form action={bindMainCommentReply} className='my-2'>
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
