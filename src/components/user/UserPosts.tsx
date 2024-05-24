"use client";
import React, { useEffect, useState } from "react";
import PostCard from "../post/card/PostCard";
import deletePostAction from "@/actions/deletePostAction";
import PostCardSkeleton from "../skeletons/PostCardSkeleton";
import getProfilePostsAction from "@/actions/getProfilePostsAction";
import { useInView } from "react-intersection-observer";

type Props = {
  user: any;
};

export default function UserPosts({ user }: Props) {
  const [posts, setPosts] = useState<any[]>();
  const [showLoader, setShowLoader] = useState(true);
  const [firstTimeLoaded, setFirstTimeLoaded] = useState(false);
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
        getProfilePostsAction({
          userId: user?.id,
          limitFrom: posts?.length,
          limitTo: 5,
        })
          .then((data) => {
            if (!data?.length) {
              setShowLoader(false);
            }

            setPosts((prev: any) => {
              //filter
              const filterArr = prev?.filter(
                (prevItem: any) => prevItem.id === data[0]?.id,
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
      getProfilePostsAction({ userId: user?.id, limitFrom: 0, limitTo: 5 })
        .then((data) => {
          setPosts(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setFirstTimeLoaded(true);
        });
    }
  }, [inView, posts?.length, user?.id]);

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
        : firstTimeLoaded === false
        ? [...Array(5)].map((_, index: number) => {
            return <PostCardSkeleton key={index.toString()} />;
          })
        : null}
      {posts?.length ? (
        <div ref={ref}>{showLoader ? <PostCardSkeleton /> : null}</div>
      ) : null}
    </React.Fragment>
  );
}
