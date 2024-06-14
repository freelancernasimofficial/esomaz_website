import React from "react";
import ChangeProfilePictureForm from "./ChangeProfilePictureForm";
import ChangeCoverPhotoForm from "./ChangeCoverPhotoForm";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='p-3'>
      <div className='centerCardMobile shadow bg-white rounded-lg p-4 mb-4'>
        <h1 className='font-semibold  mb-4'>Profile Picture</h1>
        <ChangeProfilePictureForm />
      </div>

      <div className='centerCardMobile shadow bg-white rounded-lg p-4 mb-4'>
        <h1 className='font-semibold  mb-4'>Cover Photo</h1>
        <ChangeCoverPhotoForm />
      </div>
    </div>
  );
}
