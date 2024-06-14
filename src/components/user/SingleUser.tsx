import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getSubtitle from "@/library/getSubtitle";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React from "react";

type Props = {
  user: any;
};

export default function SingleUser({ user }: Props) {
  return (
    <div className='flex justify-between mt-4'>
      <div className='flex'>
        <Avatar user={user} />
        <div className='ml-2'>
          <Link
            href={`/user/${getUsername(user)}`}
            className='block font-medium capitalize'
          >
            {getFullName(user)}
          </Link>
          <span className='block text-xs  text-gray-500 leading-3'>
            {getSubtitle(user)}
          </span>
        </div>
      </div>
    </div>
  );
}
