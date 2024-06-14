import {
  changeBasicInfoAction,
  getSingleUserByuuId,
} from "@/actions/user/userActions";
import SubmitButton from "@/components/button/SubmitButton";
import CookieStore from "@/library/CookieStore";
import auth from "@/actions/user/auth";
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
      {error && <div className='errorCard mb-3'>{error}</div>}
      {success && <div className='successCard mb-3'>{success}</div>}
      <SubmitButton title='Update' className='btn btn-primary w-full' />
    </form>
  );
}
