import PostForm from "@/components/post/PostForm";
import FriendsCard from "@/components/user/FriendsCard";
import UserIntro from "@/components/user/UserIntro";
import Model from "@/model/Model";

import React from "react";

type Props = {
  params: {
    userId: string;
  };
};

export default async function page({ params }: Props) {
  const [user] = await Model.prepare(
    `SELECT id FROM Users WHERE username=? OR uuId=?`,
    [params.userId, params.userId],
  );

  return (
    <div className='centerCard  overflow-hidden mt-6'>
      <div className='md:flex w-full'>
        <div className='lg:w-[450px] md:w-[350px] w-full md:pr-6'>
          <UserIntro userId={user?.id} />
          <FriendsCard />
        </div>
        <div className='flex-1 md:mt-0 mt-6'>
          <PostForm />
        </div>
      </div>
    </div>
  );
}
