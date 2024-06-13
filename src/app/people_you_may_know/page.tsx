import Link from "next/link";
import React from "react";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Avatar from "@/components/user/Avatar";
import peopleYouMayKnowAction from "@/actions/user/peopleYouMayKnowAction";
import LoadPeople from "./LoadPeople";
import PageTitle from "@/components/layout/PageTitle";

type Props = {};

export default async function page({}: Props) {
  return (
    <div>
      <PageTitle title='People You May Know' />
      <div className='p-3'>
        <LoadPeople />
      </div>
    </div>
  );
}
