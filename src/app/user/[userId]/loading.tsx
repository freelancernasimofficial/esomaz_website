import PostCardSkeleton from "@/components/skeletons/PostCardSkeleton";
import React from "react";

type Props = {};

export default function loading({}: Props) {
  return [...Array(5)].map((item: any, index: number) => {
    return <PostCardSkeleton key={index?.toString()} />;
  });
}
