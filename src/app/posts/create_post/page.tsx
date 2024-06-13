import React from "react";
import NewPostForm from "./NewPostForm";

type Props = {};

export default async function pagee({}: Props) {
  return (
    <div className='p-3'>
      <div className='centerCardMobile bg-white p-4'>
        <NewPostForm />
      </div>
    </div>
  );
}
