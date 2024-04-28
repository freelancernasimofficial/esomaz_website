import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='container'>
      <div className='centerCardMobile bg-error-transparent2 shadow p-4 rounded-lg'>
        <h1 className='font-semibold text-base mb-1'>Upload Video</h1>
        <div className='text-sm4 text-error-hover font-medium'>
          Video upload is not available now. Video uploading feature will be
          added very soon. Thank you
        </div>
      </div>
    </div>
  );
}
