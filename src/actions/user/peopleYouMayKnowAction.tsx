"use server";

import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Model from "@/model/Model";
import Link from "next/link";
import React from "react";

type Props = {
  limitFrom: number;
  limitTo: number;
};

export default async function peopleYouMayKnowAction({
  limitFrom,
  limitTo,
}: Props) {
  const people = await Model.query(
    `SELECT id,uuId,firstName,lastName,createdAt,(SELECT filename FROM Photos PH WHERE PH.id=U.avatarId) AS avatar FROM Users AS U ORDER BY U.id DESC LIMIT ${limitFrom},${limitTo}`,
  );

  return people?.map((item: any, index: number) => {
    return (
      <div
        key={item?.id?.toString()}
        className='py-1 flex items-center justify-between border-b border-b-gray-100'
      >
        <div className='flex items-center'>
          {" "}
          <Avatar user={item?.User} />{" "}
          <Link href={`/user/${getUsername(item)}`} className='ml-2 block'>
            <h3 className='font-semibold  leading-none capitalize'>
              {getFullName(item)}
            </h3>
            <span className=' text-sm  text-gray-500'>
              {getRelativeTime(item?.createdAt)}
            </span>
          </Link>
        </div>
      </div>
    );
  });
}
