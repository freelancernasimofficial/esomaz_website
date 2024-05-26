"use client";

import SubmitButtonClient from "@/components/button/SubmitButtonClient";
import React, { useState } from "react";

type Props = {
  comment: any;
  params: any;
};

export default function EditCommentForm({ comment, params }: Props) {
  const [text, setText] = useState("");
  const [pending, setPending] = useState(false);
  const [formStatus, setFormStatus] = useState({ status: false, message: "" });
  return (
    <div>
      <textarea
        className='mt-3 w-full rounded p-2 bg-gray-100 font-medium '
        name='comment'
        id=''
        cols={30}
        rows={5}
        placeholder='Edit comment...'
        defaultValue={comment?.text}
      ></textarea>

      {formStatus.status === false && formStatus.message.length > 0 && (
        <div className='errorCard mt-2 mb-2'>{formStatus.message}</div>
      )}
      <SubmitButtonClient
        pending={pending}
        className='w-full btn btn-primary mt-2'
        title='Edit Comment'
      />
    </div>
  );
}
