import { changeCoverPhotoAction } from "@/actions/user/userActions";
import SubmitButton from "@/components/button/SubmitButton";
import FileUploadButton from "@/components/others/FileUploadButton";
import CookieStore from "@/library/CookieStore";
import auth from "@/actions/auth/auth";
import Model from "@/model/Model";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { getS3PhotoLink } from "@/library/AwsClientS3";

type Props = {};

export default async function ChangeCoverPhotoForm({}: Props) {
  const currentUser = await auth();
  const [coverPhoto] = await Model.query(
    `SELECT * FROM Photos WHERE id=(SELECT coverPhotoId FROM Users U WHERE U.id=${currentUser?.id})`,
  );
  const error = CookieStore.getState("coverPhotoError");
  const success = CookieStore.getState("coverPhotoSuccess");
  if (success) {
    redirect("/");
  }
  return (
    <form action={changeCoverPhotoAction}>
      <div className='flex items-center justify-center mb-4 overflow-hidden rounded-lg'>
        <Image
          width={1080}
          height={1080}
          className='w-full'
          alt='cover photo'
          src={
            coverPhoto?.filename
              ? getS3PhotoLink(coverPhoto?.filename)
              : "/images/avatars/default-cover.jpg"
          }
        />
      </div>
      <FileUploadButton multiple={false} />
      {error && <div className='errorCard mt-2'>{error}</div>}

      <SubmitButton
        className='btn btn-primary w-full mt-2'
        title='Change Cover Photo'
      />
    </form>
  );
}
