"use client";
import addNewPostAction from "@/actions/addNewPostAction";
import SubmitButton from "@/components/button/SubmitButton";
import FileUploadButton from "@/components/others/FileUploadButton";
import React from "react";
import { useFormState } from "react-dom";

type Props = {};

const initialState = {
  message: "",
  status: false,
};

export default function NewPostForm({}: Props) {
  const [state, formAction] = useFormState(addNewPostAction, initialState);
  if (state.status === true) {
    location.href = "/";
  }
  return (
    <form action={formAction}>
      <textarea
        className='p-2 rounded w-full bg-gray-100 font-medium  text-gray-900 placeholder:text-gray-900'
        placeholder="What's on your mind?"
        name='text'
        id='postText'
        cols={30}
        rows={5}
      ></textarea>

      <FileUploadButton multiple={true} />
      {state.status === true && state.message?.length ? (
        <div className='successCard  mb-0 mt-2'>{state.message}</div>
      ) : (
        <SubmitButton className='btn btn-primary w-full mt-2' title='Post' />
      )}

      {state.status === false && state.message?.length ? (
        <div className='errorCard  mb-0 mt-2'>{state.message}</div>
      ) : null}
    </form>
  );
}
