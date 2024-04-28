import SubmitButton from "@/components/button/SubmitButton";
import FileUploadButton from "@/components/others/FileUploadButton";
import Avatar from "@/components/user/Avatar";
import auth from "@/library/auth";
import { AWS_S3_PHOTO_API_URL } from "@/library/constants";
import Model from "@/model/Model";
import Image from "next/image";
import React from "react";

type Props = {};

export default async function ChangeCoverPhotoForm({}: Props) {
  const currentUser = await auth();
  const [coverPhoto] = await Model.query(
    `SELECT * FROM Photos WHERE id=(SELECT coverPhotoId FROM UserInfos UF WHERE UF.userId=${currentUser?.id})`,
  );

  return (
    <form action=''>
      <div className='flex items-center justify-center mb-4 overflow-hidden rounded-lg'>
        <Image
          width={1080}
          height={1080}
          className='w-full'
          alt='cover photo'
          src={
            coverPhoto?.filename
              ? AWS_S3_PHOTO_API_URL + coverPhoto?.filename
              : "/images/static/avatars/default-cover.jpg"
          }
        />
      </div>
      <FileUploadButton multiple={false} />
      <SubmitButton
        className='btn btn-primary w-full mt-2'
        title='Change Cover Photo'
      />
    </form>
  );
}
