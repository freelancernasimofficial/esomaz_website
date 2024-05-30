import React from "react";
import NewPostForm from "./NewPostForm";

type Props = {};

export default async function pagee({}: Props) {
  return (
    <div className='container pt-3'>
      <div className='centerCardMobile bg-white p-2'>
        <NewPostForm />
      </div>
    </div>
  );
}
