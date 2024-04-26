import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  children: any;
  params: {
    postId: string;
    commentId: string;
  };
};

export default function layout({ children, params }: Props) {
  return (
    <div className='container'>
      <div className='centerCardSmall bg-transparent overflow-hidden'>
        <div className='flex items-center bg-white rounded px-2 py-1.5 overflow-x-scroll justify-between'>
          <Link
            href={`/posts/${params?.postId}/comment_reactions/${params?.commentId}`}
            tabIndex={-1}
            className='focus:bg-gray-600 w-10 h-10 shrink-0 flex items-center justify-center  rounded-full mr-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/all.png'
              alt=''
            />
          </Link>
          <Link
            href={`/posts/${params?.postId}/comment_reactions/${params?.commentId}/thumbsup`}
            tabIndex={-1}
            className='focus:bg-gray-600 w-10 h-10 shrink-0 flex items-center justify-center  rounded-full mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/thumbsup.png'
              alt=''
            />
          </Link>{" "}
          <Link
            href={`/posts/${params?.postId}/comment_reactions/${params?.commentId}/thumbsdown`}
            tabIndex={-1}
            className='focus:bg-gray-600 w-10 h-10 shrink-0 flex items-center justify-center  rounded-full mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/thumbsdown.png'
              alt=''
            />
          </Link>{" "}
          <Link
            href={`/posts/${params?.postId}/comment_reactions/${params?.commentId}/heart`}
            tabIndex={-1}
            className='focus:bg-gray-600 w-10 h-10 shrink-0 flex items-center justify-center  rounded-full mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/heart.png'
              alt=''
            />
          </Link>{" "}
          <Link
            href={`/posts/${params?.postId}/comment_reactions/${params?.commentId}/care`}
            tabIndex={-1}
            className='focus:bg-gray-600 w-10 h-10 shrink-0 flex items-center justify-center  rounded-full mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/care.png'
              alt=''
            />
          </Link>{" "}
          <Link
            href={`/posts/${params?.postId}/comment_reactions/${params?.commentId}/claps`}
            tabIndex={-1}
            className='focus:bg-gray-600 w-10 h-10 shrink-0 flex items-center justify-center  rounded-full mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/claps.png'
              alt=''
            />
          </Link>{" "}
          <Link
            href={`/posts/${params?.postId}/comment_reactions/${params?.commentId}/woow`}
            tabIndex={-1}
            className='focus:bg-gray-600 w-10 h-10 shrink-0 flex items-center justify-center  rounded-full mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/woow.png'
              alt=''
            />
          </Link>{" "}
          <Link
            href={`/posts/${params?.postId}/comment_reactions/${params?.commentId}/facepalming`}
            tabIndex={-1}
            className='focus:bg-gray-600 w-10 h-10 shrink-0 flex items-center justify-center  rounded-full mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/facepalming.png'
              alt=''
            />
          </Link>{" "}
          <Link
            href={`/posts/${params?.postId}/comment_reactions/${params?.commentId}/shrugging`}
            tabIndex={-1}
            className='focus:bg-gray-600 w-10 h-10 shrink-0 flex items-center justify-center  rounded-full mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/shrugging.png'
              alt=''
            />
          </Link>{" "}
          <Link
            href={`/posts/${params?.postId}/comment_reactions/${params?.commentId}/crying`}
            tabIndex={-1}
            className='focus:bg-gray-600 w-10 h-10 shrink-0 flex items-center justify-center  rounded-full mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/crying.png'
              alt=''
            />
          </Link>{" "}
          <Link
            href={`/posts/${params?.postId}/comment_reactions/${params?.commentId}/haha`}
            tabIndex={-1}
            className='focus:bg-gray-600 w-10 h-10 shrink-0 flex items-center justify-center  rounded-full mx-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/haha.png'
              alt=''
            />
          </Link>{" "}
          <Link
            href={`/posts/${params?.postId}/comment_reactions/${params?.commentId}/angry`}
            tabIndex={-1}
            className='focus:bg-gray-600 w-10 h-10 shrink-0 flex items-center justify-center  rounded-full ml-2'
          >
            <Image
              className='w-7 h-7 shrink-0'
              height={100}
              width={100}
              src='/reactions/angry.png'
              alt=''
            />
          </Link>
        </div>
        <div> {children}</div>
      </div>
    </div>
  );
}
