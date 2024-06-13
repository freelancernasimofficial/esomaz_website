import React from "react";
import LoadNotifications from "./LoadNotifications";
import PageTitle from "@/components/layout/PageTitle";

type Props = {
  params: any;
  searchParams: any;
};

export default async function page(props: Props) {
  return (
    <div className=''>
      <PageTitle title='Notifications' />
      <div className='p-3'>
        <LoadNotifications />
      </div>
    </div>
  );
}
