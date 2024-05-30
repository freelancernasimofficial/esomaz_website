import { sharePostAction } from "@/actions/post/postActions";
import SubmitButton from "@/components/button/SubmitButton";
import IconEarth from "@/components/icons/IconEarth";
import PostPhotos from "@/components/post/PostPhotoSlider";
import Avatar from "@/components/user/Avatar";
import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import getUsername from "@/library/getUsername";
import Model from "@/model/Model";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    postId: string;
  };
};

export default async function page({ params }: Props) {
  const user = await auth();
  const [post] = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "P.userId",
    )}) AS User,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',PH.id,'height',PH.height,'width',PH.width,'filename',PH.filename)) FROM Photos AS PH WHERE P.id=PH.postId) AS Photos,(SELECT COUNT(*) FROM Reactions R WHERE R.postId=P.id) AS Reactions,(SELECT COUNT(*) FROM Comments C WHERE C.postId=P.id) AS TotalComments,(SELECT COUNT(*) FROM Posts S WHERE S.sharedId=P.id) AS TotalShares,(SELECT type FROM Reactions MR WHERE MR.userId=${
      user?.id
    } AND P.id=MR.postId) AS myReactionType,(SELECT COUNT(*) FROM Followers MFLW WHERE MFLW.followerId=${
      user?.id
    } AND MFLW.userId=P.userId ) AS isMeFollowing,(SELECT COUNT(*) FROM Followers HFLW WHERE HFLW.followerId=P.userId AND HFLW.userId=${
      user?.id
    } ) AS isHeFollowing FROM Posts AS P WHERE P.uuId=${params.postId}`,
  );
  const error = CookieStore.getState("error");
  const success = CookieStore.getState("success");
  const bindSharePostAction = sharePostAction?.bind(null, post?.id);

  if (success?.length) {
    redirect(`/user/${getUsername(user)}`);
  }
  return (
    <div className='container'>
      <div className='centerCardSmall rounded-lg bg-white overflow-hidden shadow'>
        <div className='flex justify-between mb-1 px-4 pt-4'>
          <div className='flex'>
            <div className='w-10 h-10 overflow-hidden shrink-0 rounded-full'>
              <Avatar user={post?.User} />
            </div>
            <div className='ml-2'>
              <Link href={`/user/${getUsername(post?.User)}`} className='block'>
                <h4 className='font-semibold capitalize'>
                  {getFullName(post?.User)}
                </h4>
              </Link>
              <div className='flex items-center'>
                <IconEarth className='w-3.5 h-3.5 mr-1 text-gray-500' />
                <div className='block  text-gray-500 leading-4 '>
                  {getRelativeTime(post?.createdAt)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='mb-1.5 px-4'>
          <div className=''>{post?.text}</div>
        </div>
        <div className='block w-full'>
          <PostPhotos photos={post?.Photos} />
        </div>
        <div className='p-4'>
          <form className='w-full' action={bindSharePostAction}>
            <textarea
              className='mt-3 w-full rounded p-2 bg-gray-100 font-medium '
              name='text'
              id=''
              cols={30}
              rows={3}
              placeholder="What's on your mind?"
            ></textarea>

            {error ? <div className='errorCard mt-2 mb-2'>{error}</div> : null}
            <SubmitButton
              className='btn btn-primary w-full'
              title='Share Post'
            />
          </form>
        </div>
      </div>
    </div>
  );
}
