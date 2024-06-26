"use client";
import React, { useEffect, useState } from "react";
import PostCard from "../post/card/PostCard";
import PostCardSkeleton from "../skeletons/PostCardSkeleton";
import { useInView } from "react-intersection-observer";
import { getProfilePosts } from "@/actions/post/postActions";

type Props = {
  user: any;
};

export default function UserPosts({ user }: Props) {
  const [posts, setPosts] = useState<any[]>([]);
  const [showLoader, setShowLoader] = useState(true);

  const { ref, inView } = useInView({ threshold: 1 });

  useEffect(() => {
    if (posts?.length) {
      if (inView) {
        getProfilePosts({
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
      getProfilePosts({ userId: user?.id, limitFrom: 0, limitTo: 5 })
        .then((data) => {
          if (!data?.length) {
            setShowLoader(false);
          }
          setPosts(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, user?.id]);

  return (
    <React.Fragment>
      {posts?.length
        ? posts?.map((item: any, index: number) => {
            return <PostCard fullText={false} key={item.uuId} item={item} />;
          })
        : null}
      {showLoader && posts?.length >= 5 ? (
        <div ref={ref}>
          <PostCardSkeleton />
        </div>
      ) : null}
    </React.Fragment>
  );
}
