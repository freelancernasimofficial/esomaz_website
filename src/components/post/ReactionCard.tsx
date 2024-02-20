import Image from "next/image";
import React, { FormHTMLAttributes } from "react";
import IconLikeOutlined from "../icons/IconLikeOutlined";

type Props = {
  action?: FormHTMLAttributes<HTMLFormElement>["action"];
};

export default function ReactionCard({ action }: Props) {
  return (
    <div className='relative group'>
      <div className='bg-gray-100 p-2 rounded-lg  absolute left-0 bottom-full drop-shadow-lg scale-0 origin-bottom-left transition-transform group-hover:scale-100'>
        <div className='flex items-center'>
          <form action={action}>
            <input type='hidden' name='reactionType' value='thumbsup' />
            <button
              className='w-10 h-10 p-2 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
              type='submit'
            >
              <Image
                className='w-full h-full'
                height={100}
                width={100}
                alt='thumbsup'
                src='/reactions/thumbsup.png'
              />
            </button>
          </form>
          <form action={action} className='mx-2'>
            <input type='hidden' name='reactionType' value='thumbsdown' />
            <button
              className='w-10 h-10 p-2 bg-white hover:bg-primary-transparent2 hover:scale-110 transition-transform rounded-full overflow-hidden'
              type='submit'
            >
              <Image
                className='w-full h-full'
                height={100}
                width={100}
                alt='thumbsup'
                src='/reactions/thumbsdown.png'
              />
            </button>
          </form>
          <form action={action}>
            <input type='hidden' name='reactionType' value='heart' />
            <button
              className='w-10 h-10 p-2 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
              type='submit'
            >
              <Image
                className='w-full h-full'
                height={100}
                width={100}
                alt='thumbsup'
                src='/reactions/heart.png'
              />
            </button>
          </form>
          <form action={action} className='ml-2'>
            <input type='hidden' name='reactionType' value='care' />
            <button
              className='w-10 h-10 p-2 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
              type='submit'
            >
              <Image
                className='w-full h-full'
                height={100}
                width={100}
                alt='thumbsup'
                src='/reactions/care.png'
              />
            </button>
          </form>
        </div>
        <div className='flex items-center my-2'>
          <form action={action}>
            <input type='hidden' name='reactionType' value='claps' />
            <button
              className='w-10 h-10 p-2 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
              type='submit'
            >
              <Image
                className='w-full h-full'
                height={100}
                width={100}
                alt='thumbsup'
                src='/reactions/claps.png'
              />
            </button>
          </form>
          <form action={action} className='mx-2'>
            <input type='hidden' name='reactionType' value='woow' />
            <button
              className='w-10 h-10 p-2 bg-white hover:bg-primary-transparent2 hover:scale-110 transition-transform rounded-full overflow-hidden'
              type='submit'
            >
              <Image
                className='w-full h-full'
                height={100}
                width={100}
                alt='thumbsup'
                src='/reactions/woow.png'
              />
            </button>
          </form>
          <form action={action}>
            <input type='hidden' name='reactionType' value='haha' />
            <button
              className='w-10 h-10 p-2 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
              type='submit'
            >
              <Image
                className='w-full h-full'
                height={100}
                width={100}
                alt='thumbsup'
                src='/reactions/haha.png'
              />
            </button>
          </form>
          <form action={action} className='ml-2'>
            <input type='hidden' name='reactionType' value='brokenheart' />
            <button
              className='w-10 h-10 p-2 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
              type='submit'
            >
              <Image
                className='w-full h-full'
                height={100}
                width={100}
                alt='thumbsup'
                src='/reactions/brokenheart.png'
              />
            </button>
          </form>
        </div>
        <div className='flex items-center'>
          <form action={action}>
            <input type='hidden' name='reactionType' value='manfacepalming' />
            <button
              className='w-10 h-10 p-2 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
              type='submit'
            >
              <Image
                className='w-full h-full'
                height={100}
                width={100}
                alt='thumbsup'
                src='/reactions/manfacepalming.png'
              />
            </button>
          </form>
          <form action={action} className='mx-2'>
            <input type='hidden' name='reactionType' value='manshrugging' />
            <button
              className='w-10 h-10 p-2 bg-white hover:bg-primary-transparent2 hover:scale-110 transition-transform rounded-full overflow-hidden'
              type='submit'
            >
              <Image
                className='w-full h-full'
                height={100}
                width={100}
                alt='thumbsup'
                src='/reactions/manshrugging.png'
              />
            </button>
          </form>
          <form action={action}>
            <input type='hidden' name='reactionType' value='angry' />
            <button
              className='w-10 h-10 p-2 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
              type='submit'
            >
              <Image
                className='w-full h-full'
                height={100}
                width={100}
                alt='thumbsup'
                src='/reactions/angry.png'
              />
            </button>
          </form>
          <form action={action} className='ml-2'>
            <input type='hidden' name='reactionType' value='cry' />
            <button
              className='w-10 h-10 p-2 bg-white rounded-full overflow-hidden  hover:bg-primary-transparent2 hover:scale-110 transition-transform '
              type='submit'
            >
              <Image
                className='w-full h-full'
                height={100}
                width={100}
                alt='thumbsup'
                src='/reactions/cry.png'
              />
            </button>
          </form>
        </div>
      </div>
      <form action={action}>
        <input type='hidden' name='reactionType' value='removeReaction' />
        <button type='submit' className='svgCircleButtonSmall'>
          <IconLikeOutlined />
        </button>
      </form>
    </div>
  );
}
