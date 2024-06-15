import { getSingleUserByuuId } from "@/actions/user/userActions";
import IconSendCircle from "@/components/icons/IconSendCircle";
import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import React from "react";
import LoadMessages from "./LoadMessages";
import { getInbox } from "@/actions/message/messageActions";
import { redirect } from "next/navigation";

type Props = {
  params: {
    friend_uuid: any;
  };
};

export default async function page({ params }: Props) {
  const inbox = await getInbox("17184863856991");
  if (!inbox?.id) {
    redirect("/messages");
  } else {
    return (
      <section className='bg-white w-screen'>
        <LoadMessages inbox={inbox} />
      </section>
    );
  }
}
