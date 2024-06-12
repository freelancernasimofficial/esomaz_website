import React from "react";
import ChangeBasicInfoForm from "../edit_profile/ChangeBasicInfoForm";
import ChangeProfileInfoForm from "./ChangeProfileInfoForm";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='px-4 mt-4'>
      <div className='centerCardMobile'>
        <div className='shadow bg-white rounded-lg p-4 mb-4'>
          <h1 className='font-semibold  mb-4'>Update Account</h1>
          <ChangeBasicInfoForm />
        </div>
        <div className='shadow bg-white rounded-lg p-4'>
          <h1 className='font-semibold  mb-4'>Update Profile</h1>
          <ChangeProfileInfoForm />
        </div>
      </div>
    </div>
  );
}
