import Model from "@/model/Model";
import { redirect } from "next/navigation";
import React from "react";
import EditCommentForm from "./EditCommentForm";
import auth from "@/library/auth";

type Props = {
  params: any;
};

export default async function page({ params }: Props) {
  const currentuser = await auth();
  const [getComment] = await Model.prepare(
    `SELECT * FROM Comments WHERE id=?`,
    [Number(params.commentId)],
  );

  if (getComment?.userId !== currentuser?.id || !getComment?.id) {
    redirect(`/posts/${params.postId}`);
  }

  return (
    <div className='container'>
      <div className='centerCardSmall bg-white rounded-lg p-4'>
        <h1 className='font-semibold '>Edit Comment</h1>
        <EditCommentForm params={params} comment={getComment} />
      </div>
    </div>
  );
}
