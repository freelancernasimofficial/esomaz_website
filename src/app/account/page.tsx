import IconBank from "@/components/icons/IconBank";
import IconBriefcase from "@/components/icons/IconBriefcase";
import IconCashPlus from "@/components/icons/IconCashPlus";
import IconChat from "@/components/icons/IconChat";
import IconFindUser from "@/components/icons/IconFindUser";
import IconImageOutline from "@/components/icons/IconImageOutline";
import IconLockOutlined from "@/components/icons/IconLockOutlined";
import IconLogout from "@/components/icons/IconLogout";
import IconMoneyDollarCircleLine from "@/components/icons/IconMoneyDollarCircleLine";
import IconPersonWorkspace from "@/components/icons/IconPersonWorkspace";
import IconProject from "@/components/icons/IconProject";
import IconRss from "@/components/icons/IconRss";
import IconUser from "@/components/icons/IconUser";
import IconUsers from "@/components/icons/IconUsers";
import Avatar from "@/components/user/Avatar";
import auth from "@/actions/user/auth";
import getFullName from "@/library/getFullName";
import getUsername from "@/library/getUsername";
import Link from "next/link";
import React from "react";

type Props = {};

export default async function page({}: Props) {
  const user = await auth();

  return (
    <div className='px-4 mt-4'>
      <div className='centerCardSmall mb-4'>
        <div className='w-full bg-white rounded-lg p-4 flex flex-col items-center justify-center border-b border-b-gray-200'>
          <div className='flex flex-col justify-center items-center'>
            {" "}
            <Avatar
              className='!w-40 !h-40 border-gray-400 border-4'
              user={user}
            />
            <div className='mt-3'>
              <Link
                href={`/user/${getUsername(user)}`}
                className='font-semibold text-lg leading-none inline-block '
              >
                {getFullName(user)}
              </Link>
            </div>
          </div>
          <div className='flex items-center'>
            <h2 className='font-medium  text-slate-400 mr-2'>Balance:</h2>
            <div className='font-medium  text-green-600'>
              $25820.00 <span className='text-black  font-medium'>USD</span>
            </div>
          </div>
        </div>
        <div className='w-full bg-white rounded-lg p-4 my-4'>
          <h2 className='font-bold '>Freelancing</h2>
          <div className='mt-1'>
            <Link
              href='/jobs'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconBriefcase className='w-5 h-5' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium '>
                Find Jobs
              </span>
            </Link>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconPersonWorkspace className='w-5 h-5' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium '>
                Running Jobs
              </span>
            </Link>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconProject className='w-6 h-6' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium '>
                Post A Job
              </span>
            </Link>
          </div>
        </div>
        <div className='w-full bg-white rounded-lg p-4 my-4'>
          <h2 className='font-bold '>Payments</h2>
          <div className='mt-1'>
            <Link
              href='/account/payments/deposits'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconCashPlus className='w-7 h-7' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium '>
                Deposit Money
              </span>
            </Link>
            <Link
              href='/account/payments/withdraw'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconMoneyDollarCircleLine className='w-7 h-7' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium '>
                Withdraw Money
              </span>
            </Link>
            <Link
              href='#'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconBank className='w-6 h-6' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium '>
                Payment Methods
              </span>
            </Link>
          </div>
        </div>
        <div className='w-full bg-white rounded-lg p-4'>
          <h2 className='font-bold '>Social Media</h2>
          <div className='mt-1'>
            <Link
              href={`/user/${getUsername(user)}`}
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconUser className='w-6 h-6' />{" "}
              <span className='ml-3 block mt-0.5 font-medium '>My Profile</span>
            </Link>
            <Link
              href='/messages'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconChat className='w-6 h-6' />{" "}
              <span className='ml-3 block mt-0.5 font-medium '>Messages</span>
            </Link>
            <Link
              href={`/user/${getUsername(user)}/friends`}
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconUsers className='w-6 h-6' />{" "}
              <span className='ml-3 block mt-0.5 font-medium '>Friends</span>
            </Link>
            <Link
              href={`/user/${getUsername(user)}/followers`}
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconRss className='w-6 h-6' />{" "}
              <span className='ml-3 block mt-0.5 font-medium '>Followers</span>
            </Link>
            <Link
              href={`/people_you_may_know`}
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconFindUser className='w-6 h-6' />{" "}
              <span className='ml-3 block mt-0.5 font-medium '>
                Find Friends
              </span>
            </Link>
          </div>
        </div>

        <div className='w-full bg-white rounded-lg p-4 pb-4 mt-4'>
          <h2 className='font-bold '>Account</h2>
          <div className='mt-1'>
            <Link
              href='/account/change_password'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconLockOutlined className='w-5 h-5' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium '>
                Change Password
              </span>
            </Link>
            <Link
              href='/account/edit_profile'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconUser className='w-5 h-5' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium '>
                Edit Profile
              </span>
            </Link>
            <Link
              href='/account/change_photo'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconImageOutline className='w-5 h-5' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium '>
                Change Photo
              </span>
            </Link>
            <Link
              prefetch={false}
              href='/api/authorization/logout'
              className='flex items-center w-full  py-2 hover:text-primary-main'
            >
              <IconLogout className='w-5 h-5' />{" "}
              <span className='ml-3.5 block mt-0.5 font-medium '>Sign Out</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
