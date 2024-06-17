import React from "react";
import LoadMessages from "./LoadMessages";
import { getInbox } from "@/actions/message/messageActions";
import { redirect } from "next/navigation";

type Props = {
  params: {
    inboxuuId: any;
  };
};

export default async function page({ params }: Props) {
  const inbox = await getInbox(params.inboxuuId);
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
