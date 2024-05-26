import React from "react";
import NewPostForm from "./NewPostForm";

type Props = {};

export default async function pagee({}: Props) {
  return (
    <div className='container'>
      <div className='centerCardMobile bg-white p-2'>
        <NewPostForm />
      </div>
    </div>
  );
}
