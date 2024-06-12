import React from "react";
import ChangePasswordForm from "./ChangePasswordForm";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='px-4 mt-4'>
      <div className='centerCardMobile'>
        <div className='shadow bg-white rounded-lg p-4 mb-4'>
          <h1 className='font-semibold  mb-4'>Change Password</h1>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
