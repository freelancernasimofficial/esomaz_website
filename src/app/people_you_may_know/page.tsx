import Link from "next/link";
import React from "react";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import Avatar from "@/components/user/Avatar";
import peopleYouMayKnowAction from "@/actions/user/peopleYouMayKnowAction";
import LoadPeople from "./LoadPeople";

type Props = {};

export default async function page({}: Props) {
  return (
    <div className='bg-white'>
      <h1 className='font-semibold  bg-white shadow px-4 h-10 flex items-center fixed w-full'>
        People You May Know
      </h1>
      <div className='h-10 w-full'></div>
      <div className='p-4'>
        <LoadPeople />
      </div>
    </div>
  );
}
