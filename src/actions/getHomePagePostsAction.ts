"use server";

import auth from "@/library/auth";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

export default async function getHomePagePostsAction() {
  const user = await auth();
  const posts = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "P.userId",
    )}) AS User,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',PH.id,'height',PH.height,'width',PH.width,'filename',PH.filename)) FROM Photos AS PH WHERE P.id=PH.postId) AS Photos,(SELECT COUNT(*) FROM Reactions R WHERE R.postId=P.id) AS Reactions,(SELECT COUNT(*) FROM Comments C WHERE C.postId=P.id) AS TotalComments,(SELECT COUNT(*) FROM Posts S WHERE S.sharedId=P.id) AS TotalShares,(SELECT type FROM Reactions MR WHERE MR.userId=${
      user?.id
    } AND P.id=MR.postId) AS myReactionType,(SELECT COUNT(*) FROM Followers MFLW WHERE MFLW.followerId=${
      user?.id
    } AND MFLW.userId=P.userId ) AS isMeFollowing,(SELECT COUNT(*) FROM Followers HFLW WHERE HFLW.followerId=P.userId AND HFLW.userId=${
      user?.id
    } ) AS isHeFollowing,(SELECT JSON_OBJECT('id',SP.id,'uuId',SP.uuId,'text',SP.text,'createdAt',SP.createdAt,'User',(${getUserByObjectQuery(
      "SP.userId",
    )}),'Photos',(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',SPH.id,'height',SPH.height,'width',SPH.width,'filename',SPH.filename)) FROM Photos AS SPH WHERE SPH.postId=SP.id)) FROM Posts SP WHERE SP.id=P.sharedId) AS SharedPost FROM Posts AS P ORDER BY P.id DESC LIMIT 100`,
  );
  return posts;
}
