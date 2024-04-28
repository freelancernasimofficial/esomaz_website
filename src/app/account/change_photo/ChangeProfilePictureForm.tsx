import { changeProfilePictureAction } from "@/actions/changePhotoActions";
import SubmitButton from "@/components/button/SubmitButton";
import FileUploadButton from "@/components/others/FileUploadButton";
import Avatar from "@/components/user/Avatar";
import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
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
      <div className='flex items-center justify-center mb-4'>
        <Avatar className='w-40 h-40' user={currentUser} />
      </div>
      <FileUploadButton multiple={false} />
      {error && <div className='errorCard mt-2'>{error}</div>}

      <SubmitButton
        className='btn btn-primary w-full'
        title='Change Profile Picture'
      />
    </form>
  );
}
