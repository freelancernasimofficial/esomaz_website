import IconBriefcase from "@/components/icons/IconBriefcase";
import IconChat from "@/components/icons/IconChat";
import IconHomeOutline from "@/components/icons/IconHomeOutline";
import IconLogout from "@/components/icons/IconLogout";
import IconPersonWorkspace from "@/components/icons/IconPersonWorkspace";
import IconRss from "@/components/icons/IconRss";
import IconSettings from "@/components/icons/IconSettings";
import IconThreeUsersFilled from "@/components/icons/IconThreeUsersFilled";
import IconUser from "@/components/icons/IconUser";
import IconUsers from "@/components/icons/IconUsers";
import IconVideo from "@/components/icons/IconVideo";
import auth from "@/library/auth";
import getUsername from "@/library/getUsername";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function page({}: Props) {
  const user = await auth();

  return (
    <div className='container'>
      <div className='centerCardSmall mb-4'>
        <div className='w-full bg-white rounded-lg p-6 flex items-center justify-between'>
          <div className='flex items-center'>
            {" "}
            <div className='mr-3 shrink-0 w-12 h-12 overflow-hidden border-2 items-center border-primary-main rounded-full mx-auto'>
              <Image
                className='w-full h-full'
                width={150}
                height={150}
                alt=''
                src='/images/static/avatars/avatar-1.jpg'
              />
            </div>
            <div className=''>
              <Link
                href={`/user/${getUsername(user)}`}
                className='font-semibold inline-block text-lg'
              >
                Md Nasim
              </Link>
              <div className=' text-gray-500 leading-3 text-sm2'>
                Javascript Expert
              </div>
            </div>
          </div>
          <div>
            <h2 className='font-bold text-base text-gray-400'>Balance</h2>
            <div className='font-semibold text-green-600'>
              $25820.00 <span className='text-black font-semibold'>USD</span>
            </div>
          </div>
        </div>
        <div className='w-full bg-white rounded-lg p-6 mt-4'>
          <h2 className='font-bold'>Social Media</h2>
          <div className='mt-1'>
            <Link
              href={`/user/${getUsername(user)}`}
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconUser className='w-6 h-6' />{" "}
              <span className='ml-3 block mt-0.5 font-medium text-sm2'>
                My Profile
              </span>
            </Link>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconChat className='w-6 h-6' />{" "}
              <span className='ml-3 block mt-0.5 font-medium text-sm2'>
                Messages
              </span>
            </Link>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconUsers className='w-6 h-6' />{" "}
              <span className='ml-3 block mt-0.5 font-medium text-sm2'>
                Friends
              </span>
            </Link>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconRss className='w-6 h-6' />{" "}
              <span className='ml-3 block mt-0.5 font-medium text-sm2'>
                Followers
              </span>
            </Link>
          </div>
        </div>
        <div className='w-full bg-white rounded-lg p-6 mt-4'>
          <h2 className='font-bold'>Freelancing</h2>
          <div className='mt-1'>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconBriefcase className='w-5 h-5' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium text-sm2'>
                Post A Project
              </span>
            </Link>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconPersonWorkspace className='w-5 h-5' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium text-sm2'>
                Running Projects
              </span>
            </Link>
          </div>
        </div>
        <div className='w-full bg-white rounded-lg p-6 mt-4'>
          <h2 className='font-bold'>Account</h2>
          <div className='mt-1'>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconSettings className='w-5 h-5' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium text-sm2'>
                Settings
              </span>
            </Link>
            <Link
              href='/api/authorization/logout'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconLogout className='w-5 h-5' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium text-sm2'>
                Sign Out
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
