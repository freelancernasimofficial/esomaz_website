import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getSubtitle from "@/library/getSubtitle";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React, { HTMLAttributes } from "react";

type Props = {
  user: any;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  subtitle?: any;
  subtitleClass?: HTMLAttributes<HTMLDivElement>["className"];
};

export default function SingleUser({
  subtitleClass,
  user,
  className,
  subtitle,
}: Props) {
  return (
    <div className={`flex justify-between mt-4 ${className ? className : ""}`}>
      <div className='flex'>
        <Avatar user={user} />
        <div className='ml-2'>
          <Link
            href={`/user/${getUsername(user)}`}
            className='block font-medium capitalize'
          >
            {getFullName(user)}
          </Link>
          <span
            className={`block text-xs  text-gray-500 leading-3 ${
              subtitleClass ? subtitleClass : ""
            }`}
          >
            {subtitle ? subtitle : getSubtitle(user)}
          </span>
        </div>
      </div>
    </div>
  );
}
