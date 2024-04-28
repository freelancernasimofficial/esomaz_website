import { changeBasicInfoAction } from "@/actions/editProfileActions";
import SubmitButton from "@/components/button/SubmitButton";
import CookieStore from "@/library/CookieStore";
import React from "react";

type Props = {};

export default async function ChangeBasicInfoForm({}: Props) {
  const error = CookieStore.getState("basicError");
  const success = CookieStore.getState("basicSuccess");
  return (
    <form action={changeBasicInfoAction}>
      <input
        name='firstName'
        placeholder='First Name'
        type='text'
        className='w-full block mb-4'
      />
      <input
        name='lastName'
        placeholder='Last Name'
        type='text'
        className='w-full block mb-4'
      />
      <input
        name='subtitle'
        placeholder='Designation'
        type='text'
        className='w-full block mb-4'
      />
      <input
        name='phone'
        placeholder='Phone'
        type='text'
        className='w-full block mb-4'
      />
      {error && <div className='errorCard'>{error}</div>}
      {success && <div className='successCard'>{success}</div>}
      <SubmitButton title='Update' className='btn btn-primary w-full' />
    </form>
  );
}
