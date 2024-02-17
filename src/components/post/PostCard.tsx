import React from "react";
import IconHorizontalDots from "../icons/IconHorizontalDots";
import Image from "next/image";
import IconLikeOutlined from "../icons/IconLikeOutlined";
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

type Props = {
  item: any;
  fullText?: boolean;
};

export default function PostCard({ item, fullText }: Props) {
  return (
    <div className='bg-white rounded-lg mb-4 shadow'>
      <div className='flex justify-between mb-1 px-4 pt-4'>
        <div className='flex'>
          <div className='w-10 h-10 overflow-hidden shrink-0 rounded-full'>
            <Avatar user={item?.User} />
          </div>
          <div className='ml-2'>
            <Link href={`/user/${getUsername(item?.User)}`} className='block'>
              <h4 className='font-semibold'>{getFullName(item?.User)}</h4>
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
        <button className='svgCircleButton -mt-2'>
          <IconHorizontalDots />
        </button>
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
      <div className='w-full'>
        <PostPhotos photos={item?.Photos} />
      </div>
      <div className='mt-3 flex justify-between px-4 pb-3'>
        <div className='flex items-center flex-1'>
          <button className='svgCircleButtonSmall'>
            <IconLikeOutlined />
          </button>
          {item?.Reactions > 0 && (
            <div className='font-medium text-sm4 ml-1.5'>
              {getCompactNumber(item?.Reactions)}
            </div>
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
            <div className='font-medium text-sm4 ml-1.5'>
              {" "}
              {getCompactNumber(item?.TotalComments)}
            </div>
          )}
        </Link>

        <div className='flex items-center flex-1 justify-end'>
          <button className='svgCircleButtonSmall'>
            <IconShareOutline />
          </button>
          {item?.TotalShares > 0 && (
            <div className='font-medium text-sm4 ml-1.5'>
              {" "}
              {getCompactNumber(item?.TotalShares)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
