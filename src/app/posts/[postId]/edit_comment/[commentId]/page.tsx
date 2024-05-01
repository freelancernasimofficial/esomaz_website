import editCommentAction from "@/actions/editCommentAction";
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
  const backUrl = headerList.get("referer")?.split("edit")[0] ?? "/";
  const [getComment] = await Model.prepare(
    `SELECT * FROM Comments WHERE id=?`,
    [Number(params.commentId)],
  );

  if (!getComment?.id) {
    return redirect(backUrl);
  }

  const error = CookieStore.getState("error");
  const success = CookieStore.getState("success");
  const bindEditComment = editCommentAction?.bind(null, params?.commentId);

  return (
    <div className='container'>
      <div className='centerCardSmall bg-white rounded-lg p-4'>
        <h1 className='font-semibold text-sm2'>Edit Comment</h1>
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
          <form action={bindEditComment}>
            <textarea
              className='mt-3 w-full rounded p-2 bg-gray-100 font-medium text-sm2'
              name='comment'
              id=''
              cols={30}
              rows={5}
              placeholder='Edit comment...'
              defaultValue={getComment?.text}
            ></textarea>

            {error ? <div className='errorCard mt-2 mb-2'>{error}</div> : null}
            <SubmitButton
              className='w-full btn btn-primary'
              title='Edit Comment'
            />
          </form>
        )}
      </div>
    </div>
  );
}
