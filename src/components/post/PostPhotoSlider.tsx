"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { AWS_S3_PHOTO_API_URL } from "@/library/constants";

type PostPhotosType = {
  photos: any;
};
const PostPhotos = ({ photos }: PostPhotosType) => {
  if (photos?.length) {
    if (photos.length === 1) {
      return (
        <Image
          className='w-full'
          width={1080}
          quality={100}
          height={1920}
          priority={true}
          alt='post image'
          src={AWS_S3_PHOTO_API_URL + photos[0]?.filename}
        />
      );
    } else {
      return (
        <Slider
          className=''
          arrows={false}
          dots={true}
          slidesToScroll={1}
          slidesToShow={1}
          speed={500}
          infinite={true}
          swipeToSlide={true}
        >
          {photos?.map((photo: any, index: number) => {
            return (
              <Image
                priority={true}
                key={photo?.id.toString()}
                className='w-full'
                width={1080}
                height={600}
                quality={100}
                alt='post image'
                src={AWS_S3_PHOTO_API_URL + photo?.filename}
              />
            );
          })}
        </Slider>
      );
    }
  } else {
    return null;
  }
};
export default PostPhotos;
