"use client";
import getNotificationsAction from "@/actions/getNotificationsAction";
import SingleUserSkeleton from "@/components/skeletons/SingleUserSkeleton";
import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getNotificationMessage from "@/library/getNotificationMessage";
import getUsername from "@/library/getUsername";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

type Props = {};

export default function LoadNotifications({}: Props) {
  const { ref, inView } = useInView({ threshold: 1 });
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (notifications.length) {
      if (inView) {
        getNotificationsAction({
          limitFrom: notifications?.length,
          limitTo: 15,
        })
          .then((data) => {
            if (!data?.length) {
              setShowLoader(false);
            }
            setNotifications((prev: any) => {
              //filter
              const filterArr = prev.filter(
                (prevItem: any) => prevItem.id === data[0]?.id,
              );

              if (filterArr.length === 0) {
                return [...prev, ...data];
              } else {
                return prev;
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      getNotificationsAction({ limitFrom: 0, limitTo: 15 })
        .then((data) => {
          if (!data?.length) {
            setShowLoader(false);
          }
          setNotifications(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [inView, notifications.length]);
  return (
    <React.Fragment>
      {notifications?.map((item: any, index: number) => {
        return (
          <div key={item.id} className='flex items-start mb-4'>
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
      })}
      {showLoader ? (
        <div ref={ref}>
          <SingleUserSkeleton />{" "}
        </div>
      ) : null}
    </React.Fragment>
  );
}
