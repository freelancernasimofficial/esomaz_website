import Link from "next/link";
import React from "react";
import IconBriefcase from "../icons/IconBriefcase";
import IconLocationOutline from "../icons/IconLocationOutline";
import IconRss from "../icons/IconRss";
import IconSchoolOutline from "../icons/IconSchoolOutline";
import getCompactNumber from "@/library/getCompactNumber";
import auth from "@/actions/user/auth";
import { getUserInformations } from "@/actions/user/userActions";
import IconMaleFemale from "../icons/IconMaleFemale";

type Props = {
  userId: number;
};

export default async function UserIntro({ userId }: Props) {
  const userInfos = await getUserInformations(userId);
  const currentUser = await auth();
  return (
    <div className='w-full p-4 rounded-lg bg-white shadow my-4'>
      <div className='mb-1 flex justify-between'>
        <h2 className='font-bold '>Intro</h2>

        {currentUser?.id === userId && (
          <Link className='text-primary-main  ' href='/account/edit_profile'>
            Edit
          </Link>
        )}
      </div>

      <div className='mb-3  text-gray-600'>{userInfos?.shortBio}</div>

      <div className=' flex items-center'>
        <IconLocationOutline className='w-5 h-5 mr-1 shrink-0' />{" "}
        <span className='mr-2'>
          Lives In{" "}
          <span className='font-semibold'>
            {userInfos?.city +
              ", " +
              userInfos?.state +
              ", " +
              userInfos?.country}
          </span>
        </span>{" "}
      </div>
      <div className=' flex items-center mt-3'>
        <IconSchoolOutline className='w-5 h-5 mr-2 shrink-0' />{" "}
        <span className='mr-2'>
          Studied at{" "}
          <span className='font-semibold'>
            {userInfos?.studyLevel + ", " + userInfos?.instituteName}
          </span>
        </span>{" "}
      </div>
      <div className=' flex items-center mt-3'>
        <IconBriefcase className='w-4 h-4 mr-2 ml-0.5 shrink-0' />{" "}
        <span className='mr-2'>
          Works at{" "}
          <span className='font-semibold'>
            {" "}
            {userInfos?.workDesignation + ", " + userInfos?.workingCompany}
          </span>
        </span>{" "}
      </div>
      <div className=' flex items-center mt-3'>
        <IconMaleFemale className='w-4 h-4 mr-2 ml-0.5 shrink-0' />{" "}
        <span className='mr-2'>
          Gender <span className='font-semibold'> {userInfos?.gender}</span>
        </span>{" "}
      </div>
      <div className=' flex items-center mt-3'>
        <IconRss className='w-4 h-4 mr-2 ml-0.5 shrink-0' />{" "}
        <span className='mr-2'>
          Followed by{" "}
          <span className='font-semibold'>
            {getCompactNumber(userInfos?.totalFollowers)} People
          </span>
        </span>{" "}
      </div>
    </div>
  );
}
