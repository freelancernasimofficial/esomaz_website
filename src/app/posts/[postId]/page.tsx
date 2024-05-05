import deletePostAction from "@/actions/deletePostAction";
import getSinglePostAction from "@/actions/getSinglePostAction";
import postCommentAction from "@/actions/postCommentAction";
import PostCard from "@/components/post/card/PostCard";
import LoadComments from "@/components/post/LoadComments";
import CookieStore from "@/library/CookieStore";
import { redirect } from "next/navigation";

import React from "react";

type Props = {
  params: {
    postId: string;
  };
};

export default async function page({ params }: Props) {
  const post = await getSinglePostAction(params);

  if (!post?.id) {
    redirect("/");
  }

  return (
    <div className='container pb-10'>
      <div className='md:flex centerCard'>
        <div className='centerCardMobile md:w-2/4'>
          <div className='md:pr-2'>
            {" "}
            {
              <PostCard
                fullText={true}
                item={post}
                handleDelete={deletePostAction}
              />
            }
          </div>
        </div>
        <div className='centerCardMobile md:pl-2 md:w-2/4'>
          {" "}
          <div className='px-4 py-2'>
            <LoadComments post={post} />
          </div>
        </div>
      </div>
    </div>
  );
}
