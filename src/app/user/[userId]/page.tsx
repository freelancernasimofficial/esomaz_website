import PostCard from "@/components/post/PostCard";
import PostForm from "@/components/post/PostForm";
import FriendsCard from "@/components/user/FriendsCard";
import UserIntro from "@/components/user/UserIntro";
import auth from "@/library/auth";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

import React from "react";

type Props = {
  params: {
    userId: string;
  };
};

export default async function page({ params }: Props) {
  const currentUser = await auth();
  const [user] = await Model.prepare(
    `SELECT id FROM Users WHERE username=? OR uuId=?`,
    [params.userId, params.userId],
  );

  const posts = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "P.userId",
    )}) AS User,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',PH.id,'height',PH.height,'width',PH.width,'filename',PH.filename)) FROM Photos AS PH WHERE P.id=PH.postId) AS Photos,(SELECT COUNT(*) FROM Reactions R WHERE R.postId=P.id) AS Reactions,(SELECT COUNT(*) FROM Comments C WHERE C.postId=P.id) AS TotalComments,(SELECT COUNT(*) FROM Posts S WHERE S.sharedId=P.id) AS TotalShares,(SELECT type FROM Reactions MR WHERE MR.userId=${
      currentUser?.id
    } AND P.id=MR.postId) AS myReactionType FROM Posts AS P WHERE P.userId=${
      user?.id
    } ORDER BY P.id DESC LIMIT 100`,
  );

  return (
    <React.Fragment>
      <div className='mt-4 md:mt-0'>
        <PostForm />
      </div>
      {posts?.map((item: any, index: number) => {
        return <PostCard key={item?.uuId} item={item} />;
      })}
    </React.Fragment>
  );
}
