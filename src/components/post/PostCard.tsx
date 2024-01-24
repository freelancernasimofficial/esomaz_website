import React from "react";
import IconHorizontalDots from "../icons/IconHorizontalDots";
import Image from "next/image";
import IconLikeOutlined from "../icons/IconLikeOutlined";
import IconShareOutline from "../icons/IconShareOutline";
import IconComment from "../icons/IconComment";
import IconChat from "../icons/IconChat";

type Props = {};

export default function PostCard({}: Props) {
  return (
    <div className='bg-white p-4 rounded-lg mt-4'>
      <div className='flex justify-between mb-1'>
        <div className='flex'>
          <div className='w-10 h-10 overflow-hidden shrink-0 rounded-full'>
            <Image
              className='w-full h-full'
              height={40}
              width={40}
              alt='user avatar'
              src='/images/static/avatars/avatar-2.jpg'
            />
          </div>
          <div className='ml-2'>
            <h4 className='font-medium'>Md Nasim</h4>
            <span className='block text-sm5 text-gray-500 leading-3'>
              05:30 AM, Dec 21, 2023
            </span>
          </div>
        </div>
        <button className='svgCircleButton -mt-2'>
          <IconHorizontalDots />
        </button>
      </div>

      <div className='mb-1.5'>
        <p className='text-sm2'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut assumenda
          repellendus, alias, nihil enim earum non neque quo quam sequi
          doloribus deleniti sapiente. Dolores accusamus ratione reprehenderit
          reiciendis maxime consectetur.
        </p>
      </div>
      <div className='overflow-hidden rounded'>
        <Image
          className='w-full'
          height={400}
          width={600}
          alt='post image'
          src='/images/static/post/img-2.jpg'
        />
      </div>
      <div className='mt-3 flex justify-between'>
        <div className='flex items-center flex-1'>
          <button className='svgCircleButtonSmall'>
            <IconLikeOutlined />
          </button>
          <div className='font-medium text-sm4 ml-1.5'>12.3k</div>
        </div>
        <div className='flex items-center flex-1 justify-center'>
          <button className='svgCircleButtonSmall'>
            <IconChat />
          </button>
          <div className='font-medium text-sm4 ml-1.5'>12.3k</div>
        </div>

        <div className='flex items-center flex-1 justify-end'>
          <button className='svgCircleButtonSmall'>
            <IconShareOutline />
          </button>
        </div>
      </div>
    </div>
  );
}
