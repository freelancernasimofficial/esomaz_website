import IconBriefcase from "@/components/icons/IconBriefcase";
import IconChat from "@/components/icons/IconChat";
import IconHomeOutline from "@/components/icons/IconHomeOutline";
import IconPersonWorkspace from "@/components/icons/IconPersonWorkspace";
import IconSettings from "@/components/icons/IconSettings";
import IconThreeUsersFilled from "@/components/icons/IconThreeUsersFilled";
import IconUser from "@/components/icons/IconUser";
import IconUsers from "@/components/icons/IconUsers";
import IconVideo from "@/components/icons/IconVideo";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className='container'>
      <div className='centerCard mb-4'>
        <div className='w-full bg-white rounded-lg p-6'>
          <div className='shrink-0 w-36 h-36 overflow-hidden border-4 border-blue-700 rounded-full mx-auto'>
            <Image
              className='w-full h-full'
              width={150}
              height={150}
              alt=''
              src='/images/static/avatars/avatar-1.jpg'
            />
          </div>
          <div className='text-center'>
            <h2 className='font-semibold text-lg mt-2'>Md Nasim</h2>
            <div className='text-center text-gray-500 leading-4'>
              Javascript Expert
            </div>
          </div>
        </div>
        <div className='w-full bg-white rounded-lg p-6 mt-4'>
          <h2 className='font-bold'>Social Media</h2>
          <div className='mt-2'>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-blue-700'
            >
              <IconUser className='w-6 h-6' />{" "}
              <span className='ml-3 block mt-0.5 font-medium text-sm2'>
                My Profile
              </span>
            </Link>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-blue-700'
            >
              <IconChat className='w-6 h-6' />{" "}
              <span className='ml-3 block mt-0.5 font-medium text-sm2'>
                Messages
              </span>
            </Link>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-blue-700'
            >
              <IconUsers className='w-6 h-6' />{" "}
              <span className='ml-3 block mt-0.5 font-medium text-sm2'>
                Friends
              </span>
            </Link>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-blue-700'
            >
              <IconSettings className='w-6 h-6' />{" "}
              <span className='ml-3 block mt-0.5 font-medium text-sm2'>
                Settings
              </span>
            </Link>
          </div>
        </div>
        <div className='w-full bg-white rounded-lg p-6 mt-4'>
          <h2 className='font-bold'>Freelancing</h2>
          <div className='mt-2'>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-blue-700'
            >
              <IconBriefcase className='w-5 h-5' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium text-sm2'>
                Post A Project
              </span>
            </Link>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-blue-700'
            >
              <IconPersonWorkspace className='w-5 h-5' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium text-sm2'>
                Running Projects
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
