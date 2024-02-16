import IconBriefcase from "@/components/icons/IconBriefcase";
import IconLocationOutline from "@/components/icons/IconLocationOutline";
import IconRss from "@/components/icons/IconRss";
import IconSchoolOutline from "@/components/icons/IconSchoolOutline";
import PostCard from "@/components/post/PostCard";
import PostForm from "@/components/post/PostForm";
import UserIntro from "@/components/user/UserIntro";
import Model from "@/model/Model";
import Image from "next/image";
import Link from "next/link";
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
          <div className='w-full p-2 mt-6 rounded-lg bg-white shadow'>
            <div className='px-3 pt-1.5 flex justify-between'>
              <h2 className='font-bold text-xl'>Friends</h2>
              <Link className='text-primary-main text-sm2' href='#'>
                View All
              </Link>
            </div>
            <div className='flex flex-wrap justify-between'>
              {[...Array(6)].map((item, index) => {
                return (
                  <div
                    key={index.toString()}
                    className='w-24 h-28 sm:w-28 sm:h-32 text-center m-3 '
                  >
                    <div className='overflow-hidden rounded-lg h-45 sm:h-28 w-full'>
                      {" "}
                      <Image
                        className='w-full h-full'
                        height={150}
                        width={150}
                        alt='friends avatar'
                        src='/images/static/avatars/avatar-1.jpg'
                      />
                    </div>
                    <h2 className='mt-1 text-sm5 sm:text-sm3 font-medium'>
                      Sheikh Habib
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className='flex-1 md:mt-0 mt-6'>
          <PostForm />
        </div>
      </div>
    </div>
  );
}
