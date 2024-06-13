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
import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";
import SharedPostCard from "./SharedPostCard";
import {
  deletePost,
  editPost,
  reactionAction,
} from "@/actions/post/postActions";
import SubmitButtonClient from "@/components/button/SubmitButtonClient";
import Modal from "@/components/others/Modal";

type Props = {
  item: any;
  fullText?: boolean;
};

export default function PostCard({ item, fullText }: Props) {
  const [post, setPost] = useState<any>();
  const [enableEditForm, setEnableEditForm] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>("");
  const [editFormStatus, setEditFormStatus] = useState({
    status: false,
    message: "",
  });
  const [pending, setPending] = useState<boolean>(false);

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

  const handleEdit = () => {
    setPending(true);
    editPost({ postId: post?.id, text: editText })
      .then((data) => {
        if (data.status === true) {
          setPost((prev: any) => {
            return {
              ...prev,
              text: editText,
            };
          });
          setEnableEditForm(false);
        }
        setEditFormStatus(data);
      })
      .catch((err) => {
        setEditFormStatus(err);
      })
      .finally(() => {
        setPending(false);
      });
  };

  const deleteHandler = () => {
    const isConfirm = confirm("Are you sure?");
    if (isConfirm) {
      deletePost(post?.id)
        .then((data) => {
          if (data?.status === true) {
            location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (item?.id) {
      setPost(item);
      setEditText(item?.text);
    }
  }, [item]);

  return post?.id ? (
    <div className='bg-white rounded-lg mb-4 shadow'>
      {enableEditForm === true && (
        <Modal onClickBackdrop={() => setEnableEditForm(false)}>
          <h3 className='font-semibold'>Edit Post</h3>
          <textarea
            className='mt-3 w-full rounded p-2 bg-gray-100 font-medium '
            name='comment'
            id=''
            cols={30}
            rows={5}
            onChange={(e) => setEditText(e.target.value)}
            value={editText}
            placeholder='Edit post...'
          ></textarea>

          {editFormStatus.status === false &&
            editFormStatus.message.length > 0 && (
              <div className='errorCard mt-2 mb-2'>
                {editFormStatus.message}
              </div>
            )}
          <SubmitButtonClient
            onClick={handleEdit}
            pending={pending}
            className='w-full btn btn-primary mt-2'
            title='Edit Post'
          />
        </Modal>
      )}
      <div className='flex justify-between mb-1 px-3 pt-3'>
        <div className='flex'>
          <Avatar className='w-9 h-9' user={post?.User} />
          <div className='ml-2'>
            <div className='inline-block leading-4'>
              <Link
                href={`/user/${getUsername(post?.User)}`}
                className='font-semibold capitalize inline '
              >
                {getFullName(post?.User)}
              </Link>
              {post?.type === "AVATAR" ? (
                <span className=''> changed profile picture</span>
              ) : post?.type === "COVERPHOTO" ? (
                <span className=''> changed cover photo</span>
              ) : post?.SharedPost ? (
                <span className=''> shared a post</span>
              ) : null}
            </div>
            <div className='flex items-center'>
              <IconEarth className='w-3.5 h-3.5 mr-1 text-gray-500' />
              <Link
                href={`/posts/${post?.uuId}`}
                className='block text-sm  text-gray-500 leading-4 hover:underline hover:text-gray-900'
              >
                {getRelativeTime(post?.createdAt)}
              </Link>
            </div>
          </div>
        </div>

        <DropdownMenu>
          {post?.userId === post?.currentUserId ? (
            <React.Fragment>
              <button
                onClick={() => setEnableEditForm(true)}
                className='block  mb-2 font-medium'
              >
                Edit Post
              </button>
              <button
                onClick={deleteHandler}
                className='block    text-error-main font-medium m-0 p-0'
              >
                Delete Post
              </button>
            </React.Fragment>
          ) : null}
          {post?.userId !== post?.currentUserId ? (
            <Link
              href={`/posts/${post?.uuId}/report_post/${post?.id}`}
              className='block   font-medium  text-error-main'
            >
              Report Post
            </Link>
          ) : null}
        </DropdownMenu>
      </div>

      {post?.text ? (
        <div className=' mb-1.5 px-3'>
          {fullText === true ? (
            post?.text
          ) : post?.text?.length > 100 ? (
            <div>
              {post?.text.substring(0, 100)}...{" "}
              <Link
                className='text-primary-main '
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
            href={`/posts/${post?.uuId}/reactions/all`}
            className='text-sm block text-slate-800  py-1 px-3   hover:underline'
          >
            {getCompactNumber(post?.Reactions)} Reactions
          </Link>
        )}
        {post?.TotalComments > 0 && (
          <Link
            href={`/posts/${post?.uuId}`}
            className='text-sm text-slate-800  py-1 px-3 hover:underline'
          >
            {getCompactNumber(post?.TotalComments)} Comments
          </Link>
        )}
        {post?.TotalShares > 0 && (
          <Link
            href={`/posts/${post?.uuId}/all_shares`}
            className='text-sm text-slate-800  py-1 px-3  hover:underline'
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
            <IconChat className='!w-6 !h-5' />
          </button>
        </Link>

        <Link
          href={`/posts/${
            post?.SharedPost ? post?.SharedPost?.uuId : post?.uuId
          }/share_post`}
          className='svgCircleButtonSmall'
        >
          <IconShareOutline className='!w-6 !h-5' />
        </Link>
      </div>
    </div>
  ) : (
    <PostCardSkeleton />
  );
}
