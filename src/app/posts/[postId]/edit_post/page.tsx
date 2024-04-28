import editCommentAction from "@/actions/editCommentAction";
import editPostAction from "@/actions/editPostAction";
import SubmitButton from "@/components/button/SubmitButton";
import CookieStore from "@/library/CookieStore";
import Model from "@/model/Model";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: any;
};

export default async function page({ params }: Props) {
  const headerList = headers();
  const backUrl = headerList.get("referer")?.split("edit_post")[0] ?? "/";
  const [getPost] = await Model.prepare(`SELECT * FROM Posts WHERE uuId=?`, [
    Number(params.postId),
  ]);

  if (!getPost?.id) {
    return redirect(backUrl);
  }

  const error = CookieStore.getState("error");
  const success = CookieStore.getState("success");
  const bindEditPost = editPostAction?.bind(null, getPost?.id);

  return (
    <div className='container'>
      <div className='centerCardSmall bg-white rounded-lg p-4'>
        <h1 className='font-semibold text-sm2'>Edit Post</h1>
        {success ? (
          <div>
            <div className='successCard mt-2'>{success}</div>
            <Link
              className='block w-full bg-primary-main p-2 text-white text-center rounded-lg'
              href={backUrl}
            >
              Go Back
            </Link>
          </div>
        ) : (
          <form action={bindEditPost}>
            <textarea
              className='mt-3 w-full rounded p-2 bg-gray-100 font-medium text-sm2'
              name='text'
              id=''
              cols={30}
              rows={5}
              placeholder='Edit Post...'
              defaultValue={getPost?.text}
            ></textarea>

            {error ? <div className='errorCard mt-2 mb-2'>{error}</div> : null}
            <SubmitButton className=' btn btn-primary' title='Edit Post' />
          </form>
        )}
      </div>
    </div>
  );
}
