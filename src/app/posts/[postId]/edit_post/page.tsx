import editPostAction from "@/actions/editPostAction";
import SubmitButton from "@/components/button/SubmitButton";
import CookieStore from "@/library/CookieStore";
import Model from "@/model/Model";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: any;
};

export default async function page({ params }: Props) {
  const [getPost] = await Model.prepare(`SELECT * FROM Posts WHERE uuId=?`, [
    params.postId,
  ]);

  if (!getPost?.id) {
    return redirect("/");
  }

  const error = CookieStore.getState("error");
  const success = CookieStore.getState("success");
  const bindEditPost = editPostAction?.bind(null, getPost?.id);
  if (success?.length) {
    return redirect(`/posts/${params?.postId}`);
  }

  return (
    <div className='container'>
      <div className='centerCardSmall bg-white rounded-lg p-4'>
        <h1 className='font-semibold '>Edit Post</h1>
        <form action={bindEditPost}>
          <textarea
            className='mt-3 w-full rounded p-2 bg-gray-100 font-medium '
            name='text'
            id=''
            cols={30}
            rows={5}
            placeholder='Edit Post...'
            defaultValue={getPost?.text}
          ></textarea>

          {error ? <div className='errorCard mt-2 mb-2'>{error}</div> : null}
          <SubmitButton
            className='w-full btn mt-1 btn-primary'
            title='Edit Post'
          />
        </form>
      </div>
    </div>
  );
}
