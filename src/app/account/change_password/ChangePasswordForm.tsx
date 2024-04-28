import changePasswordAction from "@/actions/changePasswordAction";
import SubmitButton from "@/components/button/SubmitButton";
import CookieStore from "@/library/CookieStore";
import React from "react";

type Props = {};

export default async function ChangePasswordForm({}: Props) {
  const error = CookieStore.getState("error");
  const success = CookieStore.getState("success");
  return (
    <form action={changePasswordAction}>
      <input
        name='current_password'
        placeholder='Current Password'
        type='password'
        className='w-full block mb-4'
      />
      <input
        name='new_password'
        placeholder='New Password'
        type='password'
        className='w-full block mb-4'
      />
      <input
        name='confirm_password'
        placeholder='Confirm Password'
        type='password'
        className='w-full block mb-4'
      />
      {error && <div className='errorCard'>{error}</div>}
      {success && <div className='successCard'>{success}</div>}
      <SubmitButton
        title='Change Password'
        className='btn btn-primary w-full'
      />
    </form>
  );
}
