import React from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import PageTitle from "@/components/layout/PageTitle";

type Props = {};

export default function page({}: Props) {
  return (
    <section>
      <PageTitle title='Change Password' />
      <div className='p-3'>
        <div className='centerCardMobile shadow bg-white rounded-lg p-4'>
          <ChangePasswordForm />
        </div>
      </div>
    </section>
  );
}
