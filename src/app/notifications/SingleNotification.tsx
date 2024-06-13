import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getNotificationMessage from "@/library/getNotificationMessage";
import getUsername from "@/library/getUsername";
import moment from "moment";
import Link from "next/link";
import React from "react";

type Props = {
  item: any;
};

export default function SingleNotification({ item }: Props) {
  return (
    <div className='flex items-start  mb-2 bg-white p-2 rounded-lg'>
      <div className='w-9 h-9 overflow-hidden shrink-0 rounded-full'>
        <Avatar user={item?.SenderUser} />
      </div>
      <div className='ml-2'>
        <div className='flex items-center justify-start'>
          <span className='font-medium '>
            <Link href={`/user/${getUsername(item?.SenderUser)}`}>
              {getFullName(item?.SenderUser)}
            </Link>{" "}
            <span className='font-normal'>
              {getNotificationMessage(item?.actionType)}
            </span>{" "}
            {item?.Post ? (
              <Link
                className='text-primary-main !font-normal'
                href={`/posts/${item?.Post?.uuId}`}
              >
                post
              </Link>
            ) : null}
          </span>
        </div>
        <span className='block text-sm  text-gray-500 leading-4'>
          {moment(item?.createdAt).fromNow()}
        </span>
      </div>
    </div>
  );
}
