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
      className={`w-10 block h-10 overflow-hidden shrink-0  rounded-full bg-primary-main ${
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
        <Image
          className='w-full h-full bg-primary-main'
          height={40}
          width={40}
          alt='user avatar'
          src={`/images/static/avatars/default-avatar.jpg`}
        />
      )}
    </Link>
  );
}
