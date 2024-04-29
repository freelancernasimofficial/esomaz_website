import { changeBasicInfoAction } from "@/actions/editProfileActions";
import getSingleUserByuuId from "@/actions/getSingleUserByuuId";
import SubmitButton from "@/components/button/SubmitButton";
import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import React from "react";

type Props = {};

export default async function ChangeBasicInfoForm({}: Props) {
  const error = CookieStore.getState("basicError");
  const success = CookieStore.getState("basicSuccess");
  const currentUser = await auth();
  const getInfo = await getSingleUserByuuId(currentUser?.id);

  return (
    <form action={changeBasicInfoAction}>
      <input
        defaultValue={getInfo.firstName}
        name='firstName'
        placeholder='First Name'
        type='text'
        className='w-full block mb-4'
      />
      <input
        defaultValue={getInfo.lastName}
        name='lastName'
        placeholder='Last Name'
        type='text'
        className='w-full block mb-4'
      />
      <input
        defaultValue={getInfo.subtitle}
        name='subtitle'
        placeholder='Designation'
        type='text'
        className='w-full block mb-4'
      />
      <input
        defaultValue={getInfo.phone}
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