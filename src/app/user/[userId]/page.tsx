import getProfilePostsAction from "@/actions/getProfilePostsAction";
import getSingleUserByuuId from "@/actions/getSingleUserByuuId";
import PostCard from "@/components/post/card/PostCard";
import PostForm from "@/components/post/PostForm";
import SharedPostCard from "@/components/post/card/SharedPostCard";

import React from "react";
import UserPosts from "@/components/user/UserPosts";

type Props = {
  params: {
    userId: string;
  };
};

export default async function page({ params }: Props) {
  const user = await getSingleUserByuuId(params?.userId);

  return (
    <React.Fragment>
      <div className='mt-4 md:mt-0'>
        <PostForm />
      </div>
      <UserPosts user={user} />
    </React.Fragment>
  );
}
