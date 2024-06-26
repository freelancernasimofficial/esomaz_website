import React from "react";
import ChangeBasicInfoForm from "../edit_profile/ChangeBasicInfoForm";
import ChangeProfileInfoForm from "./ChangeProfileInfoForm";
import PageTitle from "@/components/layout/PageTitle";

type Props = {};

export default function page({}: Props) {
  return (
    <section>
      <PageTitle title='Edit Profile' />
      <div className='p-3'>
        <div className='centerCardMobile shadow bg-white rounded-lg p-4 mb-4'>
          <h1 className='font-semibold  mb-4'>Update Account</h1>
          <ChangeBasicInfoForm />
        </div>

        <div className='centerCardMobile shadow bg-white rounded-lg p-4 mb-4'>
          <h1 className='font-semibold  mb-4'>Update Profile</h1>
          <ChangeProfileInfoForm />
        </div>
      </div>
    </section>
  );
}
