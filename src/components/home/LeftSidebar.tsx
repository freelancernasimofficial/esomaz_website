import IconBriefcase from "@/components/icons/IconBriefcase";
import IconChat from "@/components/icons/IconChat";
import IconHomeOutline from "@/components/icons/IconHomeOutline";
import IconUsers from "@/components/icons/IconUsers";
import Link from "next/link";
import React from "react";
import IconPersonWorkspace from "../icons/IconPersonWorkspace";
import IconRss from "../icons/IconRss";
import IconProject from "../icons/IconProject";
import auth from "@/library/auth";
import getUsername from "@/library/getUsername";

type Props = {};

export default async function LeftSidebar({}: Props) {
  const currentUser = await auth();
  return (
    <div className='sm:max-w-72 md2:max-w-96  w-full full-height sticky top-20 hidden sm:flex flex-col pr-6'>
      <div className='bg-white shadow mb-4 p-4 rounded-lg h-full'>
        <h2 className='mb-1 font-bold  text-lg'>Freelancing</h2>

        <Link
          href='#'
          className='flex items-center w-full hover:text-primary-main  py-2'
        >
          <IconBriefcase className='w-5 h-5' />{" "}
          <span className='ml-3.5 block mt-0.5 font-medium text-sm2'>
            Find Jobs
          </span>
        </Link>
        <Link
          href='#'
          className='flex items-center w-full hover:text-primary-main  py-2'
        >
          <IconPersonWorkspace className='w-5 h-5' />{" "}
          <span className='ml-3 block mt-0.5 font-medium text-sm2'>
            Running Jobs
          </span>
        </Link>
        <Link
          href='#'
          className='flex items-center w-full hover:text-primary-main  py-2'
        >
          <IconProject className='w-6 h-6' />{" "}
          <span className='ml-3 block mt-0.5 font-medium text-sm2'>
            Post A Job
          </span>
        </Link>
      </div>
      <div className='bg-white shadow p-4 rounded-lg h-full'>
        <h2 className='mb-1 font-bold text-lg'>Social Media</h2>
        <Link
          href='/'
          className='flex items-center w-full hover:text-primary-main  py-2'
        >
          <IconHomeOutline className='w-6 h-6' />{" "}
          <span className='ml-3 block mt-0.5 font-medium text-sm2'>
            Newsfeed
          </span>
        </Link>

        <Link
          href='/messages'
          className='flex items-center w-full hover:text-primary-main  py-2'
        >
          <IconChat className='w-6 h-6' />{" "}
          <span className='ml-3 block mt-0.5 font-medium text-sm2'>
            Messages
          </span>
        </Link>
        <Link
          href={`/user/${getUsername(currentUser)}/friends`}
          className='flex items-center w-full hover:text-primary-main  py-2'
        >
          <IconUsers className='w-6 h-6' />{" "}
          <span className='ml-3 block mt-0.5 font-medium text-sm2'>
            Friends
          </span>
        </Link>
        <Link
          href={`/user/${getUsername(currentUser)}/followers`}
          className='flex items-center w-full hover:text-primary-main  py-2'
        >
          <IconRss className='w-6 h-6' />{" "}
          <span className='ml-3 block mt-0.5 font-medium text-sm2'>
            Followers
          </span>
        </Link>
      </div>
    </div>
  );
}
