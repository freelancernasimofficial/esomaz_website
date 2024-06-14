import Image from "next/image";
import React from "react";
import IconSearch from "../icons/IconSearch";
import IconBell from "../icons/IconBell";
import IconChat from "../icons/IconChat";
import Link from "next/link";
import auth from "@/actions/user/auth";
import Avatar from "../user/Avatar";
import { getTotalNotifications } from "@/actions/getNotificationsAction";

type Props = {};

export default async function Header({}: Props) {
  const currentUser = await auth();
  const totalNotifications = await getTotalNotifications();

  return currentUser ? (
    <div className='w-screen'>
      <header className='h-14 flex items-center justify-between bg-white border-b border-b-gray-200 fixed w-screen left-0 top-0 z-20 px-3'>
        <Link href='/' className='inline-block shrink-0'>
          <Image
            priority={true}
            width={100}
            height={100}
            quality={100}
            className='w-8 shrink-0'
            alt='logo'
            src='/images/logo/logo-icon.png'
          />
        </Link>
        <div className='md:block hidden relative max-w-screen-xs w-full'>
          <IconSearch className='absolute left-3 top-2/4 -translate-y-2/4 text-gray-400 w-5 h-5' />
          <input
            id='search-friends'
            placeholder='Search Friends...'
            type='text'
            className='w-full pl-9 rounded-full focus:border-transparent'
          />
        </div>
        <div className='flex items-center justify-end'>
          <Link
            className='relative svgCircleButton bg-gray-100 '
            href='/notifications'
          >
            {totalNotifications > 0 ? (
              <div className=' bg-rose-600 text-white  absolute -top-1 p-1 rounded-full w-5 h-5 flex items-center justify-center'>
                {totalNotifications}
              </div>
            ) : null}
            <IconBell />
          </Link>
          <Link className='svgCircleButton bg-gray-100 ml-4' href='/messages'>
            <IconChat />
          </Link>

          <Avatar
            className='ml-4 !w-8 !h-8'
            href='/account'
            user={currentUser}
          />
        </div>
      </header>
      <div className='w-screen h-14'></div>
    </div>
  ) : null;
}
