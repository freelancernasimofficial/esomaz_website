import SubmitButton from "@/components/button/SubmitButton";
import React from "react";

type Props = {};

export default async function ChangeProfileInfoForm({}: Props) {
  return (
    <form>
      <input
        placeholder='First Name'
        type='text'
        className='w-full block mb-4'
      />
      <input
        placeholder='Last Name'
        type='text'
        className='w-full block mb-4'
      />
      <SubmitButton title='Update' className='btn btn-primary w-full' />
    </form>
  );
}
