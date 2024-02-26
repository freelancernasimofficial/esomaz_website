import Link from "next/link";
import React, { use } from "react";
import IconHorizontalDots from "../icons/IconHorizontalDots";
import Image from "next/image";
import getFullName from "@/library/getFullName";
import addFriendAction, {
  acceptFriendAction,
  cancelFriendAction,
  rejectFriendAction,
} from "@/actions/addFriendAction";
import addFollowAction, {
  followBackAction,
  unFollowAction,
} from "@/actions/addFollowAction";
import getCompactNumber from "@/library/getCompactNumber";
import auth from "@/library/auth";
import UserStatistics from "./UserStatistics";
type Props = {
  user: any;
};

export default async function ProfileCard({ user }: Props) {
  const currentUser = await auth();
  const bindAddFriend = addFriendAction?.bind(null, user?.id);
  const bindCancelFriend = cancelFriendAction?.bind(null, user?.id);
  const bindAcceptFriendAction = acceptFriendAction?.bind(null, user?.id);
  const bindRejectFriend = rejectFriendAction?.bind(null, user?.id);
  const bindFollow = addFollowAction?.bind(null, user?.id);
  const bindUnfollow = unFollowAction?.bind(null, user?.id);
  const bindFollowBack = followBackAction?.bind(null, user?.id);

  const GetFriendButton = () => {
    if (Number(currentUser?.id) === Number(user?.id)) {
      return null;
    }
    if (user?.isFriends > 0) {
      return (
        <form action={bindAddFriend}>
          <button className='btn btn-success'>Friends</button>
        </form>
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
            <form className='w-full mb-2' action={bindRejectFriend}>
              <button type='submit' className='btn btn-error w-full'>
                Reject
              </button>
            </form>
            <form className='w-full' action={bindAcceptFriendAction}>
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
          <button type='submit' className='btn btn-primary mx-2'>
            Followers
          </button>
        </form>
      );
    }

    if (user?.isMeFollowing === 0 && user?.isHeFollowing === 1) {
      return (
        <form action={bindFollowBack}>
          <button type='submit' className='btn btn-primary mx-2'>
            Follow Back
          </button>
        </form>
      );
    }

    if (user?.isMeFollowing === 1 && user?.isHeFollowing === 0) {
      return (
        <form action={bindUnfollow}>
          <button type='submit' className='btn btn-success mx-2'>
            Following
          </button>
        </form>
      );
    }

    return (
      <form action={bindFollow}>
        <button type='submit' className='btn btn-primary mx-2'>
          Follow
        </button>
      </form>
    );
  };

  return (
    <div className='centerCard bg-white rounded-lg overflow-hidden shadow-sm'>
      <div className='w-full max-h-72 min-h-48  relative'>
        <div
          style={{
            backgroundImage: user?.coverPhoto?.filename
              ? `url(/uploads/photos/${user?.coverPhoto?.filename})`
              : "url(/images/static/avatars/default-cover.webp)",
            backgroundPosition: "center center",
          }}
          className='md:max-h-80 md:min-h-80 max-h-72 min-h-72 overflow-hidden rounded-t-lg bg-no-repeat bg-cover'
        ></div>
        <div className='w-48 h-48 overflow-hidden rounded-full absolute left-2/4 -translate-x-2/4 bottom-0 translate-y-2/4 border-4 border-blue-500'>
          {user?.avatar ? (
            <Image
              width={200}
              height={200}
              className='w-full h-full'
              alt='avatar'
              src={`/uploads/photos/${user?.avatar?.filename}`}
            />
          ) : (
            <Image
              width={200}
              height={200}
              className='w-full h-full'
              alt='avatar'
              src='/images/static/avatars/default-avatar.jpg'
            />
          )}
        </div>
      </div>
      <div className='pt-[105px] flex flex-col items-center pb-6 border-b'>
        <h2 className='font-semibold text-xl'>{getFullName(user)}</h2>
        <span className='block text-base font-medium text-gray-500 leading-5'>
          {user?.subtitle}
        </span>

        <div className='container mt-4'>
          <div className='flex flex-col justify-center items-center'>
            <div className='flex items-center flex-1 text-sm2'>
              <UserStatistics user={user} />
            </div>
            <div className='flex-1 flex items-center mt-4'>
              <GetFriendButton />
              <GetFollowButton />
              <button className='btn'>Message</button>
            </div>
          </div>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <div
          id='profileNavigation'
          className='flex-1 flex items-center
          [&>a]:p-4
          [&>a]:border-b-2
          [&>a]:border-b-transparent
          [&>a]:font-medium
          overflow-x-scroll
          
          '
        >
          <Link
            className='block focus:border-b-primary-main'
            href='/user/12345'
          >
            Timeline
          </Link>
          <Link
            className='block focus:border-b-primary-main'
            href='/user/12456/friends'
          >
            Friends
          </Link>
          <Link
            className='block focus:border-b-primary-main'
            href='/user/12345/photos'
          >
            Photos
          </Link>
          <Link
            className='block focus:border-b-primary-main'
            href='/user/12345/videos'
          >
            Videos
          </Link>
        </div>
        <div>
          <button className='svgCircleButton bg-gray-100 mr-4'>
            <IconHorizontalDots />
          </button>
        </div>
      </div>
    </div>
  );
}
