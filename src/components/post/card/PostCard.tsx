"use client";
import React, { useEffect, useState } from "react";
import IconShareOutline from "../../icons/IconShareOutline";
import IconChat from "../../icons/IconChat";
import Link from "next/link";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUsername from "@/library/getUsername";
import getCompactNumber from "@/library/getCompactNumber";
import Avatar from "../../user/Avatar";
import PostPhotos from "../PostPhotoSlider";
import IconEarth from "../../icons/IconEarth";
import DropdownMenu from "../../dropdown/DropdownMenu";
import ReactionCard from "../ReactionCard";
import reactionAction from "@/actions/reactionAction";
import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";
import SharedPostCard from "./SharedPostCard";

type Props = {
  item: any;
  handleDelete: (postId: any) => void;
  fullText?: boolean;
};

export default function PostCard({ item, handleDelete, fullText }: Props) {
  const [post, setPost] = useState<any>();

  const handleReaction = (reactionType: string) => {
    reactionAction({
      itemId: post?.id,
      itemType: "post",
      reactionType,
    })
      .then(() => {
        setPost((prev: any) => {
          if (reactionType === "removeReaction") {
            return {
              ...prev,
              myReactionType: null,
              Reactions: prev.Reactions - 1,
            };
          } else {
            return {
              ...prev,
              myReactionType: reactionType,
              Reactions:
                prev.myReactionType === null
                  ? prev.Reactions + 1
                  : prev.Reactions,
            };
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (item?.id) {
      setPost(item);
    }
  }, [item]);

  return post?.id ? (
    <div className='bg-white rounded-lg mb-4 shadow'>
      <div className='flex justify-between mb-1 px-3 pt-3'>
        <div className='flex'>
          <Avatar className='w-9 h-9' user={post?.User} />
          <div className='ml-2'>
            <div className='inline-block leading-4'>
              <Link
                href={`/user/${getUsername(post?.User)}`}
                className='font-semibold capitalize inline text-sm3'
              >
                {getFullName(post?.User)}
              </Link>
              {post?.type === "AVATAR" ? (
                <span className='text-sm3'> changed profile picture</span>
              ) : post?.type === "COVERPHOTO" ? (
                <span className='text-sm3'> changed cover photo</span>
              ) : post?.SharedPost ? (
                <span className='text-sm3'> shared a post</span>
              ) : null}
            </div>
            <div className='flex items-center'>
              <IconEarth className='w-3.5 h-3.5 mr-1 text-gray-500' />
              <Link
                href={`/posts/${post?.uuId}`}
                className='block text-sm5 text-gray-500 leading-4 hover:underline hover:text-gray-900'
              >
                {getRelativeTime(post?.createdAt)}
              </Link>
            </div>
          </div>
        </div>

        <DropdownMenu>
          {post?.userId === post?.currentUserId ? (
            <React.Fragment>
              <Link
                prefetch={false}
                href={`/posts/${post?.uuId}/edit_post`}
                className='block text-sm3 mb-2 font-medium'
              >
                Edit Post
              </Link>
              <button
                onClick={() => handleDelete(post?.id)}
                className='block text-sm3   text-error-main font-medium m-0 p-0'
              >
                Delete Post
              </button>
            </React.Fragment>
          ) : null}
          {post?.userId !== post?.currentUserId ? (
            <Link
              href={`/posts/${post?.uuId}/report_post/${post?.id}`}
              className='block text-sm3  font-medium  text-error-main'
            >
              Report Post
            </Link>
          ) : null}
        </DropdownMenu>
      </div>

      {post?.text ? (
        <div className='text-sm3 mb-1.5 px-3'>
          {fullText === true ? (
            post?.text
          ) : post?.text?.length > 100 ? (
            <div>
              {post?.text.substring(0, 100)}...{" "}
              <Link
                className='text-primary-main text-sm3'
                href={`/posts/${post?.uuId}`}
              >
                See More
              </Link>
            </div>
          ) : (
            post?.text
          )}
        </div>
      ) : null}
      {post?.Photos?.length ? (
        <Link href={`/posts/${post?.uuId}`} className='block w-full'>
          <PostPhotos photos={post?.Photos} />
        </Link>
      ) : null}
      {post?.SharedPost ? (
        <SharedPostCard SharedPost={post?.SharedPost} />
      ) : null}

      <div className='flex items-center justify-between '>
        {post?.Reactions > 0 && (
          <Link
            href={`/posts/${post?.uuId}/reactions`}
            className='font-medium block text-slate-800 text-sm4 py-1 px-3   hover:underline'
          >
            {getCompactNumber(post?.Reactions)} Reactions
          </Link>
        )}
        {post?.TotalComments > 0 && (
          <Link
            href={`/posts/${post?.uuId}`}
            className='font-medium text-slate-800 text-sm4 py-1 px-3 hover:underline'
          >
            {getCompactNumber(post?.TotalComments)} Comments
          </Link>
        )}
        {post?.TotalShares > 0 && (
          <Link
            href={`/posts/${post?.uuId}/all_shares`}
            className='font-medium text-slate-800 text-sm4 py-1 px-3  hover:underline'
          >
            {" "}
            {getCompactNumber(post?.TotalShares)} Shares
          </Link>
        )}
      </div>
      <div className='flex justify-between px-4 py-1 border-t border-t-gray-200'>
        <ReactionCard
          currentReaction={post?.myReactionType}
          onClick={handleReaction}
        />
        <Link
          href={`/posts/${post?.uuId}`}
          className='flex items-center flex-1 justify-center'
        >
          <button className='svgCircleButtonSmall'>
            <IconChat />
          </button>
        </Link>

        <Link
          href={`/posts/${post?.uuId}/share_post`}
          className='svgCircleButtonSmall'
        >
          <IconShareOutline />
        </Link>
      </div>
    </div>
  ) : (
    <PostCardSkeleton />
  );
}
