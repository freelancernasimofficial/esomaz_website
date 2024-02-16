import Image from "next/image";
import React, { HTMLAttributes } from "react";

type Props = {
  user: any;
  className?: HTMLAttributes<HTMLDivElement>["className"];
};

export default function Avatar({ user, className }: Props) {
  return (
    <div
      className={`w-10 h-10 overflow-hidden shrink-0 rounded-full bg-primary-main ${
        className ?? ""
      }`}
    >
      {user?.avatar ? (
        <Image
          className='w-full h-full'
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
    </div>
  );
}
