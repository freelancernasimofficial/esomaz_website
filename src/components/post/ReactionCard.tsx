"use client";
import Image from "next/image";
import React from "react";
import IconLikeOutlined from "../icons/IconLikeOutlined";

type Props = {
  currentReaction?: any;
  onClick: (reactionType: string) => void;
};

export default function ReactionCard({ currentReaction, onClick }: Props) {
  return (
    <div className='relative group'>
      <div className='bg-gray-100 p-2 rounded-lg  absolute left-0 bottom-full drop-shadow-lg scale-0 origin-bottom-left transition-transform group-hover:scale-100 z-20'>
        <div className='flex items-center'>
          <button
            onClick={() => onClick("thumbsup")}
            className='w-10 h-10 p-2 m-1 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
          >
            <Image
              priority={true}
              className='w-full h-full'
              height={100}
              width={100}
              alt='thumbsup'
              src='/reactions/thumbsup.png'
            />
          </button>
          <button
            onClick={() => onClick("thumbsdown")}
            className='w-10 h-10 p-2 m-1 bg-white hover:bg-primary-transparent2 hover:scale-110 transition-transform rounded-full overflow-hidden'
          >
            <Image
              priority={true}
              className='w-full h-full'
              height={100}
              width={100}
              alt='thumbsup'
              src='/reactions/thumbsdown.png'
            />
          </button>
          <button
            onClick={() => onClick("heart")}
            className='w-10 h-10 p-2 m-1 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
          >
            <Image
              priority={true}
              className='w-full h-full'
              height={100}
              width={100}
              alt='thumbsup'
              src='/reactions/heart.png'
            />
          </button>
          <button
            onClick={() => onClick("care")}
            className='w-10 h-10 p-2 m-1 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
          >
            <Image
              priority={true}
              className='w-full h-full'
              height={100}
              width={100}
              alt='thumbsup'
              src='/reactions/care.png'
            />
          </button>
        </div>
        <div className='flex items-center my-2'>
          <button
            onClick={() => onClick("claps")}
            className='w-10 h-10 p-2 m-1 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
          >
            <Image
              priority={true}
              className='w-full h-full'
              height={100}
              width={100}
              alt='thumbsup'
              src='/reactions/claps.png'
            />
          </button>
          <button
            onClick={() => onClick("woow")}
            className='w-10 h-10 p-2 m-1 bg-white hover:bg-primary-transparent2 hover:scale-110 transition-transform rounded-full overflow-hidden'
          >
            <Image
              priority={true}
              className='w-full h-full'
              height={100}
              width={100}
              alt='thumbsup'
              src='/reactions/woow.png'
            />
          </button>
          <button
            onClick={() => onClick("haha")}
            className='w-10 h-10 p-2 m-1 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
          >
            <Image
              priority={true}
              className='w-full h-full'
              height={100}
              width={100}
              alt='thumbsup'
              src='/reactions/haha.png'
            />
          </button>
          <button
            onClick={() => onClick("brokenheart")}
            className='w-10 h-10 p-2 m-1 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
          >
            <Image
              priority={true}
              className='w-full h-full'
              height={100}
              width={100}
              alt='thumbsup'
              src='/reactions/brokenheart.png'
            />
          </button>
        </div>
        <div className='flex items-center'>
          <button
            onClick={() => onClick("facepalming")}
            className='w-10 h-10 p-2 m-1 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
          >
            <Image
              priority={true}
              className='w-full h-full'
              height={100}
              width={100}
              alt='thumbsup'
              src='/reactions/facepalming.png'
            />
          </button>
          <button
            onClick={() => onClick("shrugging")}
            className='w-10 h-10 p-2 m-1 bg-white hover:bg-primary-transparent2 hover:scale-110 transition-transform rounded-full overflow-hidden'
          >
            <Image
              priority={true}
              className='w-full h-full'
              height={100}
              width={100}
              alt='thumbsup'
              src='/reactions/shrugging.png'
            />
          </button>
          <button
            onClick={() => onClick("angry")}
            className='w-10 h-10 p-2 m-1 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
          >
            <Image
              priority={true}
              className='w-full h-full'
              height={100}
              width={100}
              alt='thumbsup'
              src='/reactions/angry.png'
            />
          </button>
          <button
            onClick={() => onClick("crying")}
            className='w-10 h-10 p-2 m-1 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
          >
            <Image
              priority={true}
              className='w-full h-full'
              height={100}
              width={100}
              alt='thumbsup'
              src='/reactions/crying.png'
            />
          </button>
        </div>
      </div>

      {currentReaction?.length ? (
        <button
          onClick={() => onClick("removeReaction")}
          className='svgCircleButtonSmall'
        >
          <Image
            priority={true}
            className='w-5'
            alt='current Reaction'
            width={100}
            height={100}
            src={`/reactions/${currentReaction}.png`}
          />
        </button>
      ) : (
        <button
          onClick={() => onClick("thumbsup")}
          className='svgCircleButtonSmall'
        >
          <IconLikeOutlined />
        </button>
      )}
    </div>
  );
}
