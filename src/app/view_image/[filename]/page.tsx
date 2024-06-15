import { getS3PhotoLink } from "@/library/AwsClientS3";
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
          src={getS3PhotoLink(params.filename)}
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
