import PostForm from "@/components/post/PostForm";

import React from "react";
import UserPosts from "@/components/user/UserPosts";
import { getSingleUserByuuId } from "@/actions/user/userActions";
import auth from "@/actions/auth/auth";

type Props = {
  params: {
    userId: string;
  };
};

export default async function page({ params }: Props) {
  const user = await getSingleUserByuuId(params?.userId);
  const currentUser = await auth();
  return (
    <React.Fragment>
      {currentUser?.id === user?.id ? (
        <div className='mt-4 md:mt-0'>
          <PostForm />
        </div>
      ) : null}
      <UserPosts user={user} />
    </React.Fragment>
  );
}
