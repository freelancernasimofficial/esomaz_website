import React from "react";
import ChangeBasicInfoForm from "../edit_profile/ChangeBasicInfoForm";
import ChangeProfileInfoForm from "./ChangeProfileInfoForm";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='container'>
      <div className='centerCardMobile'>
        <div className='shadow bg-white rounded-lg p-4 mb-4'>
          <h1 className='font-semibold text-base mb-4'>Update Account</h1>
          <ChangeBasicInfoForm />
        </div>
        <div className='shadow bg-white rounded-lg p-4'>
          <h1 className='font-semibold text-base mb-4'>Update Profile</h1>
          <ChangeProfileInfoForm />
        </div>
      </div>
    </div>
  );
}