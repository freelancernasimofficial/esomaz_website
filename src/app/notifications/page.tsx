import React from "react";
import LoadNotifications from "./LoadNotifications";

type Props = {
  params: any;
  searchParams: any;
};

export default async function page(props: Props) {
  return (
    <div className='bg-white'>
      <h2 className='font-bold  mb-4 h-12 flex items-center fixed w-full top-16 bg-white px-4 shadow'>
        Notifications
      </h2>
      <div className='flex flex-col w-full px-4 mt-12'>
        <LoadNotifications />
      </div>
    </div>
  );
}
