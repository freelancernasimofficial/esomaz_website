import { changeProfilePictureAction } from "@/actions/user/userActions";
import SubmitButton from "@/components/button/SubmitButton";
import FileUploadButton from "@/components/others/FileUploadButton";
import Avatar from "@/components/user/Avatar";
import CookieStore from "@/library/CookieStore";
import auth from "@/actions/auth/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

export default async function ChangeProfilePictureForm({}: Props) {
  const currentUser = await auth();
  const error = CookieStore.getState("profilePhotoError");
  const success = CookieStore.getState("profilePhotoSuccess");
  if (success) {
    redirect("/");
  }
  return (
    <form action={changeProfilePictureAction}>
      <div className='flex  shrink-0 items-center justify-center mb-4'>
        <Avatar className='!w-52 !h-52 shrink-0' user={currentUser} />
      </div>
      <FileUploadButton multiple={false} />
      {error && <div className='errorCard mt-4'>{error}</div>}

      <SubmitButton
        className='btn mt-2 btn-primary w-full'
        title='Change Profile Picture'
      />
    </form>
  );
}
