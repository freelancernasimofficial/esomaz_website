import SubmitButton from "@/components/button/SubmitButton";
import FileUploadButton from "@/components/others/FileUploadButton";
import React from "react";

type Props = {};

export default async function pagee({}: Props) {
  return (
    <div className='container'>
      <div className='centerCardMobile bg-white p-2'>
        <form action=''>
          <textarea
            className='p-2 rounded w-full bg-gray-100 font-medium text-sm3 text-gray-900 placeholder:text-gray-900'
            placeholder="What's on your mind?"
            name=''
            id=''
            cols={30}
            rows={5}
          ></textarea>
          <FileUploadButton />
          <SubmitButton className='btn btn-primary w-full mt-2' title='Post' />
        </form>
      </div>
    </div>
  );
}
