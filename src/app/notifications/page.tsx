import getNotificationsAction from "@/actions/getNotificationsAction";
import seenAllNotificationsAction from "@/actions/seenAllNotificationsAction";
import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getNotificationMessage from "@/library/getNotificationMessage";
import getUsername from "@/library/getUsername";
import moment from "moment";
import Link from "next/link";

import React from "react";

type Props = {
  params: any;
  searchParams: any;
};

export default async function page(props: Props) {
  await seenAllNotificationsAction();
  const notif = await getNotificationsAction();

  return (
    <div className='container'>
      <div className='centerCardSmall bg-white rounded-lg p-4'>
        <h2 className='font-bold text-xl mb-4'>Notifications</h2>

        <div className='flex flex-col w-full'>
          {notif?.map((item: any, index: number) => {
            return (
              <div key={item.id} className='flex items-start mb-4'>
                <div className='w-9 h-9 overflow-hidden shrink-0 rounded-full'>
                  <Avatar user={item?.SenderUser} />
                </div>
                <div className='ml-2'>
                  <div className='flex items-center justify-start'>
                    <span className='font-medium text-sm2'>
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
                  <span className='block text-sm4 text-gray-500 leading-4'>
                    {moment(item?.createdAt).fromNow()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
