import SubmitButton from "@/components/button/SubmitButton";
import React from "react";

type Props = {};

export default async function ChangePasswordForm({}: Props) {
  return (
    <form>
      <input
        placeholder='Current Password'
        type='text'
        className='w-full block mb-4'
      />
      <input
        placeholder='New Password'
        type='text'
        className='w-full block mb-4'
      />
      <input
        placeholder='Confirm Password'
        type='text'
        className='w-full block mb-4'
      />
      <SubmitButton title='Update' className='btn btn-primary w-full' />
    </form>
  );
}
