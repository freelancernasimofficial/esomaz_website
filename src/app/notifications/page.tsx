import getNotificationsAction from "@/actions/getNotificationsAction";
import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getNotificationMessage from "@/library/getNotificationMessage";
import getUsername from "@/library/getUsername";
import moment from "moment";
import Link from "next/link";

import React from "react";
import NotificationPagination from "./LoadNotifications";
import LoadNotifications from "./LoadNotifications";

type Props = {
  params: any;
  searchParams: any;
};

export default async function page(props: Props) {
  return (
    <div className='container'>
      <div className='centerCardSmall bg-white rounded-lg p-4'>
        <h2 className='font-bold  mb-4'>Notifications</h2>

        <div className='flex flex-col w-full'>
          <LoadNotifications />
        </div>
      </div>
    </div>
  );
}
