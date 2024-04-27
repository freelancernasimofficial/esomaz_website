"use client";
import addNewPostAction from "@/actions/addNewPostAction";
import SubmitButton from "@/components/button/SubmitButton";
import FileUploadButton from "@/components/others/FileUploadButton";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { useFormState } from "react-dom";

type Props = {};

const initialState = {
  message: "",
  status: false,
};

export default function NewPostForm({}: Props) {
  const [state, formAction] = useFormState(addNewPostAction, initialState);
  console.log(state);

  return (
    <form action={formAction}>
      <textarea
        className='p-2 rounded w-full bg-gray-100 font-medium text-sm3 text-gray-900 placeholder:text-gray-900'
        placeholder="What's on your mind?"
        name='text'
        id='postText'
        cols={30}
        rows={5}
      ></textarea>

      <FileUploadButton multiple={true} />

      <SubmitButton className='btn btn-primary w-full mt-2' title='Post' />
      {state.status === false && state.message?.length ? (
        <div className='errorCard text-sm3 mb-0 mt-2'>{state.message}</div>
      ) : null}
    </form>
  );
}
