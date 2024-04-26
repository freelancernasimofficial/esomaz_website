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
          height={photos[0].height}
          width={photos[0].width}
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
                key={photo?.id.toString()}
                className='w-full'
                height={photo?.height}
                width={photo?.width}
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
