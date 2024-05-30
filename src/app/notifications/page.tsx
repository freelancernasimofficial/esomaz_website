import React from "react";
import LoadNotifications from "./LoadNotifications";

type Props = {
  params: any;
  searchParams: any;
};

export default async function page(props: Props) {
  return (
    <div className='container pt-3'>
      <div className='centerCardSmall bg-white rounded-lg p-4'>
        <h2 className='font-bold  mb-4'>Notifications</h2>

        <div className='flex flex-col w-full'>
          <LoadNotifications />
        </div>
      </div>
    </div>
  );
}
