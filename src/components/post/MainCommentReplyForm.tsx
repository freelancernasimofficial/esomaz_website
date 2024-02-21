import React from "react";
import SubmitButton from "../button/SubmitButton";

type Props = {};

export default function MainCommentReply({}: Props) {
  return (
    <form className='my-2'>
      <textarea
        name='text'
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
