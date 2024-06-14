import React from "react";
import ChangePasswordForm from "./ChangePasswordForm";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='p-3'>
      <div className='centerCardMobile shadow bg-white rounded-lg p-4'>
        <h1 className='font-semibold  mb-4'>Change Password</h1>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
