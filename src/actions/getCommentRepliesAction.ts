"use server";

import auth from "@/library/auth";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";
type Props = {
  parentCommentId: any;
};
export default async function getCommentRepliesAction({
  parentCommentId,
}: Props) {
  const user = await auth();
  const replies = await Model.query(
    `SELECT *,${user?.id} AS currentUserId,(${getUserByObjectQuery(
      "C.userId",
    )}) AS User,(SELECT JSON_OBJECT('User',(SELECT JSON_OBJECT('id',TCU.id,'uuId',TCU.uuId,'username',TCU.username,'firstName',TCU.firstName,'lastName',TCU.lastName) FROM Users TCU WHERE TCU.id=TC.userId)) FROM Comments TC WHERE TC.id=C.targetedCommentId AND NOT TC.userId=C.userId) AS targetedComment,(SELECT type FROM Reactions MR WHERE MR.userId=${
      user?.id
    } AND MR.commentId=C.id) AS myReactionType,(SELECT COUNT(*) FROM Reactions R WHERE R.commentId=C.id) AS totalReactions FROM Comments C WHERE C.parentId=${parentCommentId} ORDER BY C.id ASC`,
  );

  return replies;
}
