import { AWS_S3_PHOTO_API_URL } from "@/library/constants";
import Image from "next/image";
import React from "react";

type Props = {
  params: {
    filename: string;
  };
};

export default function page({ params }: Props) {
  return (
    <div className='p-3 mb-4'>
      <div className='centerCardSmall shadow rounded-lg overflow-hidden bg-white'>
        <Image
          priority={true}
          src={AWS_S3_PHOTO_API_URL + params.filename}
          quality={100}
          width={1920}
          height={1080}
          alt='full photo'
          className='w-full'
        />
      </div>
    </div>
  );
}
