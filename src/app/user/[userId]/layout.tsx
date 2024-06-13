import ProfileCard from "@/components/user/ProfileCard";
import React from "react";
import UserIntro from "@/components/user/UserIntro";
import { getFullUserByUsername } from "@/actions/user/userActions";

type Props = {
  children: any;
  params: {
    userId: string;
  };
};

export default async function UserLayout({ params, children }: Props) {
  const user = await getFullUserByUsername(params?.userId);

  return (
    <div className='p-3'>
      <div className='centerCard'>
        <div className='md:flex'>
          <div className='w-full md:w-6/12 md:pr-6'>
            <ProfileCard user={user} />
            <UserIntro userId={user?.id} />
          </div>
          <div className='w-full md:w-6/12'> {children}</div>
        </div>
      </div>
    </div>
  );
}
