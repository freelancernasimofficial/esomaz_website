"use server";
import auth from "@/library/auth";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import Model from "@/model/Model";

type Props = {
  limitTo: any;
  limitFrom: any;
  postId: any;
  postOwnerId: any;
};

export default async function getCommentsAction({
  limitFrom,
  limitTo,
  postId,
  postOwnerId,
}: Props) {
  const user = await auth();
  const comments = await Model.query(
    `SELECT *,${
      user?.id
    } AS currentUserId,${postOwnerId} AS postOwnerId,(${getUserByObjectQuery(
      "CMT.userId",
    )}) AS User,(SELECT type FROM Reactions MR WHERE MR.userId=${
      user?.id
    } AND MR.commentId=CMT.id) AS myReactionType,(SELECT COUNT(*) FROM Reactions R WHERE R.commentId=CMT.id) AS totalReactions,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',RPC.id,'uuId',RPC.uuId,'text',RPC.text,'userId',RPC.userId,'postOwnerId',${postOwnerId},'currentUserId',${
      user?.id
    },'myReactionType',(SELECT type FROM Reactions RMR WHERE RMR.userId=${
      user?.id
    } AND RMR.commentId=RPC.id),'totalReactions',(SELECT COUNT(*) FROM Reactions RPCR WHERE RPCR.commentId=RPC.id ),'createdAt',RPC.createdAt,'User',(${getUserByObjectQuery(
      "RPC.userId",
    )}),'targetedComment',(SELECT JSON_OBJECT('id',TR.id,'User',(${getUserByObjectQuery(
      "TR.userId",
    )})) FROM Comments TR WHERE TR.id=RPC.targetedCommentId AND TR.userId!=${
      user?.id
    }))) FROM Comments AS RPC WHERE RPC.parentId=CMT.id) AS Replies FROM Comments CMT WHERE CMT.postId=${postId} AND CMT.parentId IS NULL ORDER BY CMT.id DESC LIMIT ${limitFrom},${limitTo}`,
  );

  return comments;
}
