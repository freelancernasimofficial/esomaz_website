import React from "react";
import IconShareOutline from "../icons/IconShareOutline";
import IconChat from "../icons/IconChat";
import Link from "next/link";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import getCompactNumber from "@/library/getCompactNumber";
import Avatar from "../user/Avatar";
import PostPhotos from "./PostPhotoSlider";
import IconEarth from "../icons/IconEarth";
import DropdownMenu from "../dropdown/DropdownMenu";
import ReactionCard from "./ReactionCard";
import reactionAction from "@/actions/reactionAction";
import addFollowAction, { unFollowAction } from "@/actions/addFollowAction";
import deletePostAction from "@/actions/deletePostAction";

type Props = {
  item: any;
  fullText?: boolean;
};

export default function SharedPostCard({ item, fullText }: Props) {
  const postReactionAction = reactionAction?.bind(null, {
    itemId: item?.id,
    itemType: "post",
  });

  const bindFollowUser = addFollowAction?.bind(null, item?.userId);
  const bindUnFollowFollowUser = unFollowAction?.bind(null, item?.userId);
  const bindDeletePost = deletePostAction?.bind(null, item?.id);

  return (
    <div className='bg-white rounded-lg mb-4 shadow'>
      <div className='flex justify-between mb-1 px-4 pt-4'>
        <div className='flex'>
          <Avatar className='w-9 h-9' user={item?.User} />
          <div className='ml-2'>
            <div className='inline-block'>
              {" "}
              <Link
                href={`/user/${getUsername(item?.User)}`}
                className='font-semibold capitalize inline text-sm3'
              >
                {getFullName(item?.User)}
              </Link>
              <span className='font-normal lowercase text-sm3'>
                {" "}
                shared a post
              </span>
            </div>
            <div className='flex items-center'>
              <IconEarth className='w-3.5 h-3.5 mr-1 text-gray-500' />
              <Link
                href={`/posts/${item?.uuId}`}
                className='block text-sm5 text-gray-500 leading-4 hover:underline hover:text-gray-900'
              >
                {getRelativeTime(item?.createdAt)}
              </Link>
            </div>
          </div>
        </div>

        <DropdownMenu>
          {item?.userId !== item?.currentUserId ? (
            <React.Fragment>
              {item?.isHeFollowing && item?.isMeFollowing ? (
                <form action={bindUnFollowFollowUser}>
                  <button
                    type='submit'
                    className='block mb-2 text-success-main hover:!text-primary-main p-0 font-medium text-sm3'
                  >
                    You are Followers
                  </button>
                </form>
              ) : item?.isHeFollowing && !item?.isMeFollowing ? (
                <form action={bindFollowUser}>
                  <button
                    type='submit'
                    className='block text-success-main mb-2 hover:!text-primary-main p-0 font-medium text-sm3'
                  >
                    Follow Back
                  </button>
                </form>
              ) : item?.isMeFollowing && !item.isHeFollowing ? (
                <form action={bindUnFollowFollowUser}>
                  <button
                    type='submit'
                    className='block text-info-main mb-2 hover:!text-primary-main p-0 font-medium text-sm3'
                  >
                    Following
                  </button>
                </form>
              ) : (
                <form action={bindFollowUser}>
                  <button
                    type='submit'
                    className='block mb-2 hover:!text-primary-main p-0 font-medium text-sm3'
                  >
                    Follow Profile
                  </button>
                </form>
              )}
              <Link
                href={`/posts/${item?.uuId}/report_post/${item?.id}`}
                className='block text-sm3 mb-2 font-medium  text-error-main'
              >
                Report Post
              </Link>
            </React.Fragment>
          ) : null}
          {item?.userId === item?.currentUserId ? (
            <React.Fragment>
              <Link
                prefetch={false}
                href={`/posts/${item?.uuId}/edit_post`}
                className='block text-sm3 mb-2 font-medium'
              >
                Edit Post
              </Link>
              <form action={bindDeletePost}>
                <button
                  type='submit'
                  className='block text-sm3   text-error-main font-medium m-0 p-0'
                >
                  Delete Post
                </button>
              </form>
            </React.Fragment>
          ) : null}
        </DropdownMenu>
      </div>

      <div className='mb-1.5 px-4'>
        <div className='text-sm3'>
          {fullText ? (
            item?.text
          ) : item?.text?.length > 100 ? (
            <div>
              {item.text.substring(0, 100)}...{" "}
              <Link
                className='text-primary-main text-sm3'
                href={`/posts/${item?.uuId}`}
              >
                See More
              </Link>
            </div>
          ) : (
            item?.text
          )}
        </div>
      </div>
      <div className='block w-full px-4'>
        <div className='border border-gray-200 rounded-lg overflow-hidden'>
          <div className='flex justify-between'>
            <div className='flex p-2'>
              <Avatar className='w-9 h-9' user={item?.SharedPost?.User} />
              <div className='ml-2'>
                <Link
                  href={`/user/${getUsername(item?.SharedPost?.User)}`}
                  className='font-semibold capitalize inline text-sm3'
                >
                  {getFullName(item?.SharedPost?.User)}
                </Link>
                <div className='flex items-center'>
                  <IconEarth className='w-3.5 h-3.5 mr-1 text-gray-500' />
                  <Link
                    href={`/posts/${item?.SharedPost?.uuId}`}
                    className='block text-sm5 text-gray-500 leading-4 hover:underline hover:text-gray-900'
                  >
                    {getRelativeTime(item?.SharedPost?.createdAt)}
                  </Link>
                </div>
              </div>
            </div>
            <Link className='p-2' href={`/posts/${item?.SharedPost?.uuId}`}>
              <button className='btn btn-primary-transparent !text-sm4 !p-1.5 !h-auto'>
                View
              </button>
            </Link>
          </div>
          <div className='px-2 text-sm3'>
            {item?.SharedPost?.text?.substring(0, 50)}...{" "}
            <Link
              className='text-primary-main text-sm3'
              href={`/posts/${item?.SharedPost?.uuId}`}
            >
              See More
            </Link>
          </div>
          <Link href={`/posts/${item?.SharedPost?.uuId}`}>
            <PostPhotos photos={item?.SharedPost?.Photos} />
          </Link>
        </div>
      </div>
      <div className='flex items-center justify-between '>
        {item?.Reactions > 0 && (
          <Link
            href={`/posts/${item?.uuId}/reactions`}
            className='font-medium block text-slate-800 text-sm4 py-1 px-3   hover:underline'
          >
            {getCompactNumber(item?.Reactions)} Reactions
          </Link>
        )}
        {item?.TotalComments > 0 && (
          <Link
            href={`/posts/${item?.uuId}`}
            className='font-medium text-slate-800 text-sm4 py-1 px-3 hover:underline'
          >
            {getCompactNumber(item?.TotalComments)} Comments
          </Link>
        )}
        {item?.TotalShares > 0 && (
          <Link
            href={`/posts/${item?.uuId}/all_shares`}
            className='font-medium text-slate-800 text-sm4 py-1 px-3  hover:underline'
          >
            {" "}
            {getCompactNumber(item?.TotalShares)} Shares
          </Link>
        )}
      </div>
      <div className='flex justify-between px-4 py-1 border-t border-t-gray-200'>
        <div className='flex items-center flex-1'>
          <ReactionCard
            currentReaction={item?.myReactionType}
            action={postReactionAction}
          />
        </div>
        <Link
          href={`/posts/${item?.uuId}`}
          className='flex items-center flex-1 justify-center'
        >
          <button className='svgCircleButtonSmall'>
            <IconChat />
          </button>
        </Link>

        <div className='flex items-center flex-1 justify-end'>
          <Link
            href={`/posts/${item?.SharedPost?.uuId}/share_post`}
            className='svgCircleButtonSmall'
          >
            <IconShareOutline />
          </Link>
        </div>
      </div>
    </div>
  );
}
