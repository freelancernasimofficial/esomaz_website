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
import SingleNotification from "./SingleNotification";

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
          limitTo: 5,
        })
          .then((data) => {
            if (!data?.length) {
              setShowLoader(false);
            }
            setNotifications((prev: any) => {
              return [...prev, ...data];
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      getNotificationsAction({ limitFrom: 0, limitTo: 5 })
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
        return item;
      })}
      {showLoader ? (
        <div ref={ref}>
          <SingleUserSkeleton />{" "}
        </div>
      ) : null}
    </React.Fragment>
  );
}
