"use client";
import React, { useEffect, useState } from "react";
import PostCard from "../post/card/PostCard";
import getHomePagePostsAction from "@/actions/getHomePagePostsAction";
import deletePostAction from "@/actions/deletePostAction";
import PostCardSkeleton from "../skeletons/PostCardSkeleton";

type Props = {};

export default function HomePagePosts({}: Props) {
  const [posts, setPosts] = useState<any[]>();
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
    getHomePagePostsAction({ limitFrom: 0, limitTo: 5 })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return posts?.length
    ? posts?.map((item: any, index: number) => {
        return (
          <PostCard handleDelete={handleDelete} key={item.uuId} item={item} />
        );
      })
    : [...Array(5)].map((_, index: number) => {
        return <PostCardSkeleton key={index.toString()} />;
      });
}
