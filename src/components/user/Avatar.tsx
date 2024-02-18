import getUsername from "@/library/getUsername";
import Image from "next/image";
import Link from "next/link";
import React, { HTMLAttributes } from "react";

type Props = {
  user: any;
  className?: HTMLAttributes<HTMLDivElement>["className"];
};

export default function Avatar({ user, className }: Props) {
  return (
    <Link
      href={`/user/${getUsername(user)}`}
      className={`w-10 block h-10 overflow-hidden shrink-0 rounded-full bg-primary-main ${
        className ?? ""
      }`}
    >
      {user?.avatar ? (
        <Image
          className='w-full h-full bg-primary-main'
          height={40}
          width={40}
          alt='user avatar'
          src={`/uploads/photos/${user?.avatar?.filename}`}
        />
      ) : (
        <div className='h-full w-full flex justify-center shrink-0 items-center font-semibold text-white'>
          {user?.firstName?.substring(0, 1) + user?.lastName?.substring(0, 1)}
        </div>
      )}
    </Link>
  );
}
