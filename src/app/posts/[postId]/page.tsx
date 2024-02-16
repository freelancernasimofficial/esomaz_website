import IconHorizontalDots from "@/components/icons/IconHorizontalDots";
import PostCard from "@/components/post/PostCard";
import SingleComment from "@/components/post/SingleComment";
import Avatar from "@/components/user/Avatar";
import getFullName from "@/library/getFullName";
import getRelativeTime from "@/library/getRelativeTime";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import getUsername from "@/library/getUsername";
import Model from "@/model/Model";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    postId: string;
  };
};

export default async function page({ params }: Props) {
  const [post] = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "P.userId",
    )}) AS User,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',PH.id,'height',PH.height,'width',PH.width,'filename',PH.filename)) FROM Photos AS PH WHERE P.id=PH.postId) AS Photos,(SELECT COUNT(*) FROM Reactions R WHERE R.postId=P.id) AS Reactions,(SELECT COUNT(*) FROM Comments C WHERE C.postId=P.id) AS TotalComments,(SELECT COUNT(*) FROM Posts S WHERE S.sharedId=P.id) AS TotalShares FROM Posts AS P WHERE P.uuId=${
      params.postId
    }`,
  );

  const comments = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "CMT.userId",
    )}) AS User FROM Comments CMT WHERE CMT.postId=${
      post?.id
    } AND CMT.parentId IS NULL ORDER BY CMT.id DESC`,
  );

  return (
    <div className='container pb-10'>
      {" "}
      <div className='centerCardSmall bg-white rounded-lg'>
        <PostCard fullText={true} item={post} />
      </div>
      <div className='centerCardSmall bg-white rounded-lg'>
        <div className='px-4 py-2'>
          {" "}
          <h1 className='font-bold text-lg  mb-4'>
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
