"use server";

import auth from "@/library/auth";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

export default async function getCommentsAction(post: any) {
  const user = await auth();
  const comments = await Model.query(
    `SELECT *,(${getUserByObjectQuery(
      "CMT.userId",
    )}) AS User,(SELECT type FROM Reactions MR WHERE MR.userId=${
      user?.id
    } AND MR.commentId=CMT.id) AS myReactionType,(SELECT COUNT(*) FROM Reactions R WHERE R.commentId=CMT.id) AS totalReactions,(SELECT COUNT(*) FROM Followers MFLW WHERE MFLW.followerId=${
      user?.id
    } AND MFLW.userId=CMT.userId ) AS isMeFollowing,(SELECT COUNT(*) FROM Followers HFLW WHERE HFLW.followerId=CMT.userId AND HFLW.userId=${
      user?.id
    } ) AS isHeFollowing,(SELECT ${
      post?.userId
    }) AS postOwnerId FROM Comments CMT WHERE CMT.postId=${
      post?.id
    } AND CMT.parentId IS NULL ORDER BY CMT.id DESC`,
  );
  return comments;
}
