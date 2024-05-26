import ProfileCard from "@/components/user/ProfileCard";
import React from "react";
import FriendsCard from "@/components/user/FriendsCard";
import UserIntro from "@/components/user/UserIntro";
import { getFullUserByUsername } from "@/actions/userActions";

type Props = {
  children: any;
  params: {
    userId: string;
  };
};

export default async function UserLayout({ params, children }: Props) {
  const user = await getFullUserByUsername(params?.userId);

  return (
    <div className='container'>
      <div className='centerCard'>
        <div className='md:flex'>
          <div className='w-full md:w-6/12 md:pr-6'>
            <ProfileCard user={user} />
            <UserIntro userId={user?.id} />
            <FriendsCard user={user} />
          </div>
          <div className='w-full md:w-6/12'> {children}</div>
        </div>
      </div>
    </div>
  );
}
