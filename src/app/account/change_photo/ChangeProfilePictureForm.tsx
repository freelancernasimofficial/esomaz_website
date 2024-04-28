import SubmitButton from "@/components/button/SubmitButton";
import FileUploadButton from "@/components/others/FileUploadButton";
import Avatar from "@/components/user/Avatar";
import auth from "@/library/auth";
import React from "react";

type Props = {};

export default async function ChangeProfilePictureForm({}: Props) {
  const currentUser = await auth();
  return (
    <form action=''>
      <div className='flex items-center justify-center mb-4'>
        <Avatar className='w-40 h-40' user={currentUser} />
      </div>
      <FileUploadButton multiple={false} />
      <SubmitButton
        className='btn btn-primary w-full mt-2'
        title='Change Profile Picture'
      />
    </form>
  );
}
