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
    <div className='pt-11 bg-white'>
      <h2 className='font-semibold  bg-white shadow px-4 h-10 flex top-16 items-center fixed w-full'>
        People You May Know
      </h2>
      <div className='bg-white px-4 mt-2'>
        <LoadPeople />
      </div>
    </div>
  );
}
