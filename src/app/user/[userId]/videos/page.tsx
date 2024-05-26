import ProfileCard from "@/components/user/ProfileCard";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='centerCard'>
      <div className='bg-white shadow p-4 rounded-lg mb-8'>
        <div className='flex justify-between mb-4'>
          <h2 className='font-semibold '>Videos</h2>
        </div>
        <div className='w-full errorCard'>
          Video Upload Is Not Available Now. Video uploading feature will be
          added very soon. After that all the users will be able to upload
          videos. Thank you
        </div>
      </div>
    </div>
  );
}
