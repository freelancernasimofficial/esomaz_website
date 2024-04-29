import getProfilePostsAction from "@/actions/getProfilePostsAction";
import getSingleUserByuuId from "@/actions/getSingleUserByuuId";
import PostCard from "@/components/post/card/PostCard";
import PostForm from "@/components/post/PostForm";
import SharedPostCard from "@/components/post/card/SharedPostCard";

import React from "react";

type Props = {
  params: {
    userId: string;
  };
};

export default async function page({ params }: Props) {
  const user = await getSingleUserByuuId(params?.userId);
  const posts = await getProfilePostsAction(user?.id);

  return (
    <React.Fragment>
      <div className='mt-4 md:mt-0'>
        <PostForm />
      </div>
      {posts?.map((item: any, index: number) => {
        return item?.SharedPost ? (
          <SharedPostCard key={item.uuId} item={item} />
        ) : (
          <PostCard key={item.uuId} item={item} />
        );
      })}
    </React.Fragment>
  );
}
