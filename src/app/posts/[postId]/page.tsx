import getCommentsAction from "@/actions/getCommentsAction";
import getSinglePostAction from "@/actions/getSinglePostAction";
import postCommentAction from "@/actions/postCommentAction";
import SubmitButton from "@/components/button/SubmitButton";
import PostCard from "@/components/post/PostCard";
import SharedPostCard from "@/components/post/SharedPostCard";
import SingleComment from "@/components/post/SingleComment";
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
  const comments = await getCommentsAction(post);

  const bindPostCommentAction = postCommentAction?.bind(null, post?.id);
  const error = CookieStore.getState("error");
  const success = CookieStore.getState("success");

  return (
    <div className='container pb-10'>
      {" "}
      <div className='md:flex centerCard'>
        <div className='centerCardMobile md:w-2/4'>
          <div className='md:pr-2'>
            {" "}
            {post?.SharedPost ? (
              <SharedPostCard fullText={true} item={post} />
            ) : (
              <PostCard fullText={true} item={post} />
            )}
            <div className='bg-white rounded-lg p-4 mb-4'>
              <form action={bindPostCommentAction} className='flex flex-col'>
                <textarea
                  placeholder='Enter comment'
                  className='w-full block bg-gray-100 rounded-lg mb-3 p-2 text-sm3'
                  name='comment'
                  id=''
                  cols={30}
                  rows={3}
                ></textarea>

                {error && <div className='errorCard w-full mb-3'>{error}</div>}
                {success && (
                  <div className='successCard w-full mb-3'>{success}</div>
                )}
                <SubmitButton
                  title='Comment'
                  className='btn btn-primary w-full'
                />
              </form>
            </div>
          </div>
        </div>
        <div className='centerCardMobile md:pl-2 md:w-2/4'>
          {" "}
          <div className='bg-white rounded-lg'>
            <div className='px-4 py-2'>
              {" "}
              <h1 className='font-bold text-base  mb-4 mt-1'>
                Comments ({post?.TotalComments})
              </h1>
              {comments?.map((item: any, index: number) => {
                return (
                  <SingleComment params={params} key={item?.uuId} item={item} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
