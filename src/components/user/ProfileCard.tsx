import Link from "next/link";
import React from "react";
import getFullName from "@/library/getFullName";

import auth from "@/actions/user/auth";
import UserStatistics from "./UserStatistics";
import getSubtitle from "@/library/getSubtitle";
import getUsername from "@/library/getUsername";
import Avatar from "./Avatar";
import { AWS_S3_PHOTO_API_URL } from "@/library/constants";
import {
  acceptFriendAction,
  addFollowAction,
  addFriendAction,
  cancelFriendAction,
  followBackAction,
  rejectFriendAction,
  unFollowAction,
  unFriendAction,
} from "@/actions/user/userActions";
type Props = {
  user: any;
};

export default async function ProfileCard({ user }: Props) {
  const currentUser = await auth();
  const bindAddFriend = addFriendAction?.bind(null, user?.id);
  const bindCancelFriend = cancelFriendAction?.bind(null, user?.id);
  const bindAcceptFriendAction = acceptFriendAction?.bind(null, user?.id);
  const bindUnFriend = unFriendAction?.bind(null, user?.id);
  const bindRejectFriend = rejectFriendAction?.bind(null, user?.id);
  const bindFollow = addFollowAction?.bind(null, user?.id);
  const bindUnfollow = unFollowAction?.bind(null, user?.id);
  const bindFollowBack = followBackAction?.bind(null, user?.id);

  const GetFriendButton = () => {
    if (Number(currentUser?.id) === Number(user?.id)) {
      return null;
    }
    if (user?.isFriends === 1) {
      return (
        <div tabIndex={-1} className='relative group '>
          <button className='btn btn-success  group-focus:hidden'>
            Friends
          </button>
          <form
            className='hidden group-focus-within:block group-focus:block absolute left-0 top-0'
            action={bindUnFriend}
          >
            <button className='btn btn-error'>Remove</button>
          </form>
        </div>
      );
    }
    if (
      user?.meRequestSent > 0 &&
      user?.heRequestSent === 0 &&
      user?.isFriends === 0
    ) {
      return (
        <form action={bindCancelFriend}>
          <button type='submit' className='btn btn-info'>
            Requested
          </button>
        </form>
      );
    }
    if (
      user?.heRequestSent === 1 &&
      user?.isFriends === 0 &&
      user?.meRequestSent === 0
    ) {
      return (
        <div className='relative group' tabIndex={-1}>
          <button className='btn btn-info'>Respond</button>
          <div className='absolute bottom-0 left-0 w-full hidden group-focus:block group-focus-within:block drop-shadow-lg'>
            <form className='mb-2' action={bindRejectFriend}>
              <button type='submit' className='btn btn-error w-full'>
                Reject
              </button>
            </form>
            <form action={bindAcceptFriendAction}>
              <button type='submit' className='btn btn-success w-full'>
                Accept
              </button>
            </form>
          </div>
        </div>
      );
    }

    if (
      user?.heRequestSent === 0 &&
      user?.heRequestSent === 0 &&
      user?.isFriends === 0
    )
      return (
        <form action={bindAddFriend}>
          <button type='submit' className='btn btn-primary'>
            Add Friend
          </button>
        </form>
      );
  };

  const GetFollowButton = () => {
    if (currentUser?.id === user?.id) {
      return null;
    }

    if (user?.isMeFollowing === 1 && user?.isHeFollowing === 1) {
      return (
        <form action={bindUnfollow}>
          <button type='submit' className='btn btn-primary mx-3'>
            Followers
          </button>
        </form>
      );
    }

    if (user?.isMeFollowing === 0 && user?.isHeFollowing === 1) {
      return (
        <form action={bindFollowBack}>
          <button type='submit' className='btn btn-primary mx-3'>
            Follow Back
          </button>
        </form>
      );
    }

    if (user?.isMeFollowing === 1 && user?.isHeFollowing === 0) {
      return (
        <form action={bindUnfollow}>
          <button type='submit' className='btn btn-info mx-3'>
            Following
          </button>
        </form>
      );
    }

    return (
      <form action={bindFollow}>
        <button type='submit' className='btn btn-primary mx-3'>
          Follow
        </button>
      </form>
    );
  };

  return (
    <div className='centerCard bg-white rounded-lg overflow-hidden shadow-sm'>
      <div
        style={{
          backgroundImage: user?.coverPhoto?.filename
            ? `url(${AWS_S3_PHOTO_API_URL + user?.coverPhoto?.filename})`
            : "url(/images/static/avatars/default-cover.webp)",
          backgroundPosition: "center center",
        }}
        className='md:max-h-80 md:min-h-80 max-h-72 min-h-72  rounded-t-lg bg-no-repeat bg-cover relative'
      >
        <div className='w-48 h-48 overflow-hidden rounded-full absolute left-2/4 -translate-x-2/4 bottom-0  border-8 translate-y-2/4 border-white'>
          <Avatar className='w-full h-full' user={user} />
        </div>
      </div>

      <div className='pt-[105px] flex flex-col items-center pb-6 border-b'>
        <h1 className='font-semibold'>{getFullName(user)}</h1>
        <span className='block  font-medium text-gray-500 leading-5'>
          {getSubtitle(user)}
        </span>

        <div className='p-3'>
          <div className='flex flex-col justify-center items-center'>
            <div className='flex items-center flex-1 '>
              <UserStatistics user={user} />
            </div>
            <div className='flex-1 flex items-center mt-4'>
              <GetFriendButton />
              <GetFollowButton />
              {currentUser?.id !== user?.id && (
                <Link
                  href={`/messages/${user?.uuId}`}
                  className='btn flex items-center'
                >
                  Message
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <div
          id='profileNavigation'
          className='flex-1 flex items-center justify-between
          [&>a]:p-4
          [&>a]:border-b-2
          [&>a]:border-b-transparent
          [&>a]:font-medium
          overflow-x-scroll
          
          '
        >
          <Link
            className='block focus:border-b-primary-main'
            href={`/user/${getUsername(user)}`}
          >
            Timeline
          </Link>
          <Link
            className='block focus:border-b-primary-main'
            href={`/user/${getUsername(user)}/friends`}
          >
            Friends
          </Link>
          <Link
            className='block focus:border-b-primary-main'
            href={`/user/${getUsername(user)}/followers`}
          >
            Followers
          </Link>
          <Link
            className='block focus:border-b-primary-main'
            href={`/user/${getUsername(user)}/following`}
          >
            Following
          </Link>
          <Link
            className='block focus:border-b-primary-main'
            href={`/user/${getUsername(user)}/photos`}
          >
            Photos
          </Link>
          <Link
            className='block focus:border-b-primary-main'
            href={`/user/${getUsername(user)}/videos`}
          >
            Videos
          </Link>

          {currentUser?.id !== user?.id ? (
            <Link
              className='block focus:border-b-primary-main text-error-main'
              href={`/user/${getUsername(user)}/report_user`}
            >
              Report
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
