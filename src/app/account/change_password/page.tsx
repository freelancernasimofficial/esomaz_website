import React from "react";
import ChangePasswordForm from "./ChangePasswordForm";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='container'>
      <div className='centerCardMobile'>
        <div className='shadow bg-white rounded-lg p-4 mb-4'>
          <h1 className='font-semibold text-base mb-4'>Change Password</h1>
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
}
