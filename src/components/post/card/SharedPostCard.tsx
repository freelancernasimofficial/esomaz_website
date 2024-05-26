import IconEarth from "@/components/icons/IconEarth";
import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React from "react";
import PostPhotos from "../PostPhotoSlider";

type Props = {
  SharedPost: any;
};

export default function SharedPostCard({ SharedPost }: Props) {
  return (
    <div className='block w-full px-4 pb-4'>
      <div className='border border-gray-200 rounded-lg overflow-hidden'>
        <div className='flex justify-between'>
          <div className='flex p-2'>
            <Avatar className='w-9 h-9' user={SharedPost?.User} />
            <div className='ml-2'>
              <div className='inline-block leading-4'>
                {" "}
                <Link
                  href={`/user/${getUsername(SharedPost?.User)}`}
                  className='font-semibold capitalize inline '
                >
                  {getFullName(SharedPost?.User)}
                </Link>
                {SharedPost?.type === "AVATAR" ? (
                  <span className=''> changed profile picture</span>
                ) : SharedPost?.type === "COVERPHOTO" ? (
                  <span className=''> changed cover photo</span>
                ) : null}
              </div>
              <div className='flex items-center'>
                <IconEarth className='w-3.5 h-3.5 mr-1 text-gray-500' />
                <Link
                  href={`/posts/${SharedPost?.uuId}`}
                  className='block text-sm  text-gray-500 leading-4 hover:underline hover:text-gray-900'
                >
                  {getRelativeTime(SharedPost?.createdAt)}
                </Link>
              </div>
            </div>
          </div>
          <Link className='p-2' href={`/posts/${SharedPost?.uuId}`}>
            <button className='btn btn-primary-transparent ! !p-1.5 !h-auto'>
              View
            </button>
          </Link>
        </div>
        {SharedPost?.text?.length && (
          <div className='px-2 '>
            {SharedPost?.text?.substring(0, 50)}...{" "}
            <Link
              className='text-primary-main '
              href={`/posts/${SharedPost?.uuId}`}
            >
              See More
            </Link>
          </div>
        )}
        {SharedPost?.Photos?.length && (
          <Link href={`/posts/${SharedPost?.uuId}`}>
            <PostPhotos photos={SharedPost?.Photos} />
          </Link>
        )}
      </div>
    </div>
  );
}
