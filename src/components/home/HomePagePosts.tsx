"use client";
import React, { useEffect, useState } from "react";
import PostCard from "../post/card/PostCard";
import getHomePagePostsAction from "@/actions/getHomePagePostsAction";
import deletePostAction from "@/actions/deletePostAction";
import PostCardSkeleton from "../skeletons/PostCardSkeleton";
import { useInView } from "react-intersection-observer";

type Props = {};

export default function HomePagePosts({}: Props) {
  const [posts, setPosts] = useState<any[]>();
  const { ref, inView } = useInView({ threshold: 1 });
  const handleDelete = (postId: any) => {
    deletePostAction(postId)
      .then(() => {
        const filterPosts = posts?.filter((post: any) => post?.id !== postId);
        setPosts(filterPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (posts?.length) {
      if (inView) {
        getHomePagePostsAction({ limitFrom: posts?.length, limitTo: 5 })
          .then((data) => {
            setPosts((prev: any) => [...prev, ...data]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      getHomePagePostsAction({ limitFrom: 0, limitTo: 5 })
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
            return (
              <PostCard
                fullText={false}
                handleDelete={handleDelete}
                key={item.uuId}
                item={item}
              />
            );
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
