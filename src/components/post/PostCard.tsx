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
import auth from "@/library/auth";
import deletePostAction from "@/actions/deletePostAction";

type Props = {
  item: any;
  fullText?: boolean;
};

export default async function PostCard({ item, fullText }: Props) {
  const currentUser = await auth();
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
          <div className='w-10 h-10 overflow-hidden shrink-0 rounded-full'>
            <Avatar user={item?.User} />
          </div>
          <div className='ml-2'>
            <Link href={`/user/${getUsername(item?.User)}`} className='block'>
              <h4 className='font-semibold capitalize'>
                {getFullName(item?.User)}{" "}
                <span className='font-normal lowercase'>shared a post</span>
              </h4>
            </Link>
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
          {item?.userId !== currentUser?.id ? (
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
          {item?.userId === currentUser?.id ? (
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
        <div className='text-sm2'>
          {fullText ? (
            item?.text
          ) : item?.text?.length > 100 ? (
            <div>
              {item.text.substring(0, 100)}...{" "}
              <Link className='text-primary-main' href={`/posts/${item?.uuId}`}>
                See More
              </Link>
            </div>
          ) : (
            item?.text
          )}
        </div>
      </div>
      <Link href={`/posts/${item?.uuId}`} className='block w-full'>
        <PostPhotos photos={item?.Photos} />
      </Link>

      <div className='mt-3 flex justify-between px-4 pb-3'>
        <div className='flex items-center flex-1'>
          <ReactionCard
            currentReaction={item?.myReactionType}
            action={postReactionAction}
          />
          {item?.Reactions > 0 && (
            <Link
              href={`/posts/${item?.uuId}/reactions`}
              className='font-medium block text-slate-800 text-sm4 ml-1 mt-0.5'
            >
              {getCompactNumber(item?.Reactions)} People
            </Link>
          )}
        </div>
        <Link
          href={`/posts/${item?.uuId}`}
          className='flex items-center flex-1 justify-center'
        >
          <button className='svgCircleButtonSmall'>
            <IconChat />
          </button>

          {item?.TotalComments > 0 && (
            <div className='font-medium text-slate-800 text-sm4 ml-1'>
              {getCompactNumber(item?.TotalComments)} Comments
            </div>
          )}
        </Link>

        <div className='flex items-center flex-1 justify-end'>
          <Link
            href={`/posts/${item?.uuId}/share_post`}
            className='svgCircleButtonSmall'
          >
            <IconShareOutline />
          </Link>
          {item?.TotalShares > 0 && (
            <Link
              href={`/posts/${item?.uuId}/all_shares`}
              className='font-medium text-slate-800 text-sm4 ml-1'
            >
              {" "}
              {getCompactNumber(item?.TotalShares)} Shares
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
