import {
  getSingleUserByuuId,
  getUserPhotos,
  getUserPhotosCount,
} from "@/actions/user/userActions";
import { getS3PhotoLink } from "@/library/AwsClientS3";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    userId: string;
  };
};

export default async function page({ params }: Props) {
  const user = await getSingleUserByuuId(params.userId);
  const photos = await getUserPhotos({
    userId: user?.id,
    limitFrom: 0,
    limitTo: 50,
  });
  const totalPhotos = await getUserPhotosCount(user?.id);

  return (
    <div className='centerCard'>
      <div className='bg-white shadow p-4 rounded-lg mb-8'>
        <div className='flex justify-between mb-4'>
          <h2 className='font-semibold '>Photos ({totalPhotos})</h2>
        </div>
        <div className='md:flex md:flex-wrap justify-between w-full'>
          {photos?.map((photo: any) => {
            return (
              <Link
                href={`/view_image/${photo?.filename}`}
                key={photo?.filename}
                className='w-full block md:w-80 md2:w-56 md:h-48  mb-4 bg-gray-700  overflow-hidden rounded-lg'
              >
                <Image
                  className='w-full h-full'
                  width={200}
                  height={200}
                  quality={100}
                  alt='profile photos'
                  src={getS3PhotoLink(photo?.filename)}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
