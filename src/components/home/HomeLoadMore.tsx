"use client";
import React, { useEffect, useState } from "react";
import LoaderSpinnerLarge from "../others/LoaderSpinnerLarge";
import { useInView } from "react-intersection-observer";
import getHomePagePostsAction from "@/actions/getHomePagePostsAction";
import PostCard from "../post/card/PostCard";
import SharedPostCard from "../post/card/SharedPostCard";

type Props = {};

export default function HomeLoadMore({}: Props) {
  const { ref, inView, entry } = useInView({ threshold: 0 });
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    if (inView === true) {
      getHomePagePostsAction({
        limitFrom: posts?.length === 0 ? 5 : posts?.length + 5,
        limitTo: 5,
      })
        .then((data) => {
          setPosts((prev: any) => {
            if (!JSON.stringify(prev).includes(data[0]?.uuId)) {
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
  }, [inView, posts?.length]);

  return (
    <React.Fragment>
      {posts?.map((item: any, index: number) => {
        return item?.SharedPost ? (
          <SharedPostCard key={item?.uuId} item={item} />
        ) : (
          <PostCard key={item?.uuId} item={item} />
        );
      })}
      <div ref={ref} className='w-full flex items-center justify-center'>
        <LoaderSpinnerLarge />
      </div>
    </React.Fragment>
  );
}
