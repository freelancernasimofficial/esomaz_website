import { AWS_S3_PHOTO_API_URL } from "@/library/constants";
import getUsername from "@/library/getUsername";
import Image from "next/image";
import Link from "next/link";
import React, { HTMLAttributes } from "react";

type Props = {
  user: any;
  className?: HTMLAttributes<HTMLDivElement>["className"];
  href?: string;
};

export default function Avatar({ user, className, href }: Props) {
  return (
    <Link
      href={href?.length ? href : `/user/${getUsername(user)}`}
      className={`w-10 block h-10 overflow-hidden shrink-0  rounded-full bg-primary-main ${
        className ?? ""
      }`}
    >
      {user?.avatar ? (
        <Image
          quality={100}
          className='w-full h-full bg-primary-main'
          height={500}
          width={500}
          alt='user'
          src={AWS_S3_PHOTO_API_URL + user?.avatar}
        />
      ) : (
        <Image
          className='w-full h-full bg-primary-main'
          height={500}
          width={500}
          alt='user'
          src={`/images/static/avatars/default-avatar.jpg`}
        />
      )}
    </Link>
  );
}
