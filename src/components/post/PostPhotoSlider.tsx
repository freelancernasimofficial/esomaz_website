"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import IconChevronLeft from "../icons/IconChevronLeft";
import IconArrowBack from "../icons/IconArrowBack";

type PostPhotosType = {
  photos: any;
};
const PostPhotos = ({ photos }: PostPhotosType) => {
  if (photos?.length) {
    if (photos.length === 1) {
      return (
        <Image
          className='w-full'
          height={400}
          width={600}
          alt='post image'
          src='/images/static/post/img-2.jpg'
        />
      );
    } else {
      return (
        <Slider
          className=''
          arrows={true}
          dots={true}
          slidesToScroll={1}
          slidesToShow={1}
          speed={500}
          infinite={true}
        >
          <div>
            <Image
              className='w-full h-full'
              height={400}
              width={600}
              alt='post image'
              src='/images/static/post/img-2.jpg'
            />
          </div>
          <div>
            <Image
              className='w-full'
              height={400}
              width={600}
              alt='post image'
              src='/images/static/post/img-2.jpg'
            />
          </div>
          <div>
            <Image
              className='w-full'
              height={400}
              width={600}
              alt='post image'
              src='/images/static/post/img-2.jpg'
            />
          </div>
          <div>
            <Image
              className='w-full'
              height={400}
              width={600}
              alt='post image'
              src='/images/static/post/img-2.jpg'
            />
          </div>
          <div>
            <Image
              className='w-full'
              height={400}
              width={600}
              alt='post image'
              src='/images/static/post/img-2.jpg'
            />
          </div>
          <div>
            <Image
              className='w-full'
              height={400}
              width={600}
              alt='post image'
              src='/images/static/post/img-2.jpg'
            />
          </div>
        </Slider>
      );
    }
  } else {
    return null;
  }
};
export default PostPhotos;
