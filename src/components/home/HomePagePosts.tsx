"use client";
import React, { useEffect, useState } from "react";
import PostCard from "../post/card/PostCard";
import PostCardSkeleton from "../skeletons/PostCardSkeleton";
import { useInView } from "react-intersection-observer";
import { getHomePagePosts } from "@/actions/postActions";

type Props = {};

export default function HomePagePosts({}: Props) {
  const [posts, setPosts] = useState<any[]>();
  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (posts?.length) {
      if (inView) {
        getHomePagePosts({ limitFrom: posts?.length, limitTo: 5 })
          .then((data) => {
            setPosts((prev: any) => {
              //filter
              const filterArr = prev.filter(
                (prevItem: any) => prevItem.id === data[0].id,
              );
              if (filterArr.length === 0) {
                return [...prev, ...data];
              } else {
                return prev;
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      getHomePagePosts({ limitFrom: 0, limitTo: 5 })
        .then((data) => {
          setPosts(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [inView, posts?.length]);

  return (
    <React.Fragment>
      {posts?.length
        ? posts?.map((item: any, index: number) => {
            return <PostCard fullText={false} key={item.uuId} item={item} />;
          })
        : [...Array(5)].map((_, index: number) => {
            return <PostCardSkeleton key={index.toString()} />;
          })}
      <div ref={ref}>
        <PostCardSkeleton />
      </div>
    </React.Fragment>
  );
}
