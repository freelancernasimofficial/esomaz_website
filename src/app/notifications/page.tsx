import React from "react";
import LoadNotifications from "./LoadNotifications";

type Props = {
  params: any;
  searchParams: any;
};

export default async function page(props: Props) {
  return (
    <div className='bg-white'>
      <h1 className='font-bold h-10 flex items-center fixed w-full  bg-white px-4 shadow'>
        Notifications
      </h1>
      <div className='w-full h-10'></div>
      <div className='p-4'>
        <LoadNotifications />
      </div>
    </div>
  );
}
