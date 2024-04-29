"use client";
import React, { useEffect, useState } from "react";
import PostCard from "../post/card/PostCard";
import deletePostAction from "@/actions/deletePostAction";
import PostCardSkeleton from "../skeletons/PostCardSkeleton";
import getProfilePostsAction from "@/actions/getProfilePostsAction";

type Props = {
  user: any;
};

export default function UserPosts({ user }: Props) {
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
    getProfilePostsAction({ userId: user?.id, limitFrom: 0, limitTo: 5 })
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.id]);

  return posts?.length
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
      });
}
