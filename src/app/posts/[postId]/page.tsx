import postCommentAction from "@/actions/postCommentAction";
import SubmitButton from "@/components/button/SubmitButton";
import PostCard from "@/components/post/PostCard";
import SingleComment from "@/components/post/SingleComment";
import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

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

  const comments = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "CMT.userId",
    )}) AS User,(SELECT type FROM Reactions MR WHERE MR.userId=${
      user?.id
    } AND MR.commentId=CMT.id) AS myReactionType,(SELECT COUNT(*) FROM Reactions R WHERE R.commentId=CMT.id) AS totalReactions,(SELECT COUNT(*) FROM Followers MFLW WHERE MFLW.followerId=${
      user?.id
    } AND MFLW.userId=CMT.userId ) AS isMeFollowing,(SELECT COUNT(*) FROM Followers HFLW WHERE HFLW.followerId=CMT.userId AND HFLW.userId=${
      user?.id
    } ) AS isHeFollowing FROM Comments CMT WHERE CMT.postId=${
      post?.id
    } AND CMT.parentId IS NULL ORDER BY CMT.id DESC`,
  );

  const bindPostCommentAction = postCommentAction?.bind(null, post?.id);
  const error = CookieStore.getState("error");
  const success = CookieStore.getState("success");

  return (
    <div className='container pb-10'>
      {" "}
      <div className='centerCardSmall bg-white rounded-lg'>
        <PostCard fullText={true} item={post} />
      </div>
      <div className='centerCardSmall bg-white rounded-lg p-4 mb-4'>
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
          {success && <div className='successCard w-full mb-3'>{success}</div>}
          <SubmitButton title='Comment' className='btn btn-primary w-full' />
        </form>
      </div>
      <div className='centerCardSmall bg-white rounded-lg'>
        <div className='px-4 py-2'>
          {" "}
          <h1 className='font-bold text-lg  mb-4 mt-1'>
            Comments ({post?.TotalComments})
          </h1>
          {comments?.map((item: any, index: number) => {
            return <SingleComment key={item?.uuId} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
}
