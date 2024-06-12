import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  children: any;
  params: {
    postId: string;
    reactionType: string;
  };
};

export default function layout({ children, params }: Props) {
  return (
    <div className='w-full bg-white'>
      <div className='flex shadow  fixed w-full items-center bg-white rounded px-4 h-11 overflow-x-scroll justify-between'>
        <Link
          href={`/posts/${params?.postId}/reactions/all`}
          tabIndex={-1}
          className={`${
            params.reactionType === "all" ? "bg-gray-200" : "bg-transparent"
          } w-8 h-8 shrink-0 flex items-center justify-center  rounded-full`}
        >
          <Image
            className='w-6 h-6 shrink-0'
            height={100}
            width={100}
            src='/reactions/all.png'
            alt=''
          />
        </Link>
        <Link
          href={`/posts/${params?.postId}/reactions/thumbsup`}
          tabIndex={-1}
          className={`${
            params.reactionType === "thumbsup"
              ? "bg-gray-200"
              : "bg-transparent"
          } w-8 h-8 shrink-0 flex items-center justify-center  rounded-full mx-1`}
        >
          <Image
            className='w-6 h-6 shrink-0'
            height={100}
            width={100}
            src='/reactions/thumbsup.png'
            alt=''
          />
        </Link>{" "}
        <Link
          href={`/posts/${params?.postId}/reactions/thumbsdown`}
          tabIndex={-1}
          className={`${
            params.reactionType === "thumbsdown"
              ? "bg-gray-200"
              : "bg-transparent"
          } w-8 h-8 shrink-0 flex items-center justify-center  rounded-full mx-1`}
        >
          <Image
            className='w-6 h-6 shrink-0'
            height={100}
            width={100}
            src='/reactions/thumbsdown.png'
            alt=''
          />
        </Link>{" "}
        <Link
          href={`/posts/${params?.postId}/reactions/heart`}
          tabIndex={-1}
          className={`${
            params.reactionType === "heart" ? "bg-gray-200" : "bg-transparent"
          } w-8 h-8 shrink-0 flex items-center justify-center  rounded-full mx-1`}
        >
          <Image
            className='w-6 h-6 shrink-0'
            height={100}
            width={100}
            src='/reactions/heart.png'
            alt=''
          />
        </Link>{" "}
        <Link
          href={`/posts/${params?.postId}/reactions/care`}
          tabIndex={-1}
          className={`${
            params.reactionType === "care" ? "bg-gray-200" : "bg-transparent"
          } w-8 h-8 shrink-0 flex items-center justify-center  rounded-full mx-1`}
        >
          <Image
            className='w-6 h-6 shrink-0'
            height={100}
            width={100}
            src='/reactions/care.png'
            alt=''
          />
        </Link>{" "}
        <Link
          href={`/posts/${params?.postId}/reactions/claps`}
          tabIndex={-1}
          className={`${
            params.reactionType === "claps" ? "bg-gray-200" : "bg-transparent"
          } w-8 h-8 shrink-0 flex items-center justify-center  rounded-full mx-1`}
        >
          <Image
            className='w-6 h-6 shrink-0'
            height={100}
            width={100}
            src='/reactions/claps.png'
            alt=''
          />
        </Link>{" "}
        <Link
          href={`/posts/${params?.postId}/reactions/woow`}
          tabIndex={-1}
          className={`${
            params.reactionType === "woow" ? "bg-gray-200" : "bg-transparent"
          } w-8 h-8 shrink-0 flex items-center justify-center  rounded-full mx-1`}
        >
          <Image
            className='w-6 h-6 shrink-0'
            height={100}
            width={100}
            src='/reactions/woow.png'
            alt=''
          />
        </Link>{" "}
        <Link
          href={`/posts/${params?.postId}/reactions/facepalming`}
          tabIndex={-1}
          className={`${
            params.reactionType === "facepalming"
              ? "bg-gray-200"
              : "bg-transparent"
          } w-8 h-8 shrink-0 flex items-center justify-center  rounded-full mx-1`}
        >
          <Image
            className='w-6 h-6 shrink-0'
            height={100}
            width={100}
            src='/reactions/facepalming.png'
            alt=''
          />
        </Link>{" "}
        <Link
          href={`/posts/${params?.postId}/reactions/shrugging`}
          tabIndex={-1}
          className={`${
            params.reactionType === "shrugging"
              ? "bg-gray-200"
              : "bg-transparent"
          } w-8 h-8 shrink-0 flex items-center justify-center  rounded-full mx-1`}
        >
          <Image
            className='w-6 h-6 shrink-0'
            height={100}
            width={100}
            src='/reactions/shrugging.png'
            alt=''
          />
        </Link>{" "}
        <Link
          href={`/posts/${params?.postId}/reactions/crying`}
          tabIndex={-1}
          className={`${
            params.reactionType === "crying" ? "bg-gray-200" : "bg-transparent"
          } w-8 h-8 shrink-0 flex items-center justify-center  rounded-full mx-1`}
        >
          <Image
            className='w-6 h-6 shrink-0'
            height={100}
            width={100}
            src='/reactions/crying.png'
            alt=''
          />
        </Link>{" "}
        <Link
          href={`/posts/${params?.postId}/reactions/haha`}
          tabIndex={-1}
          className={`${
            params.reactionType === "haha" ? "bg-gray-200" : "bg-transparent"
          } w-8 h-8 shrink-0 flex items-center justify-center  rounded-full mx-1`}
        >
          <Image
            className='w-6 h-6 shrink-0'
            height={100}
            width={100}
            src='/reactions/haha.png'
            alt=''
          />
        </Link>{" "}
        <Link
          href={`/posts/${params?.postId}/reactions/angry`}
          tabIndex={-1}
          className={`${
            params.reactionType === "angry" ? "bg-gray-200" : "bg-transparent"
          } w-8 h-8 shrink-0 flex items-center justify-center  rounded-full`}
        >
          <Image
            className='w-6 h-6 shrink-0'
            height={100}
            width={100}
            src='/reactions/angry.png'
            alt=''
          />
        </Link>
      </div>
      <div className='w-full h-11'></div>
      {children}
    </div>
  );
}
