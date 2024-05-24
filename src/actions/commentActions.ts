"use server";
import auth from "@/library/auth";
import getUserByObjectQuery from "@/library/getUserByObjectQuery";
import makeUniqueId from "@/library/makeUniqueId";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

type Props = {
  limitTo: any;
  limitFrom: any;
  postId: any;
  postOwnerId: any;
};

export default async function getComments({
  limitFrom,
  limitTo,
  postId,
  postOwnerId,
}: Props) {
  const user = await auth();
  const comments = await Model.query(
    `SELECT *,${
      user?.id
    } AS currentUserId,${postOwnerId} AS postOwnerId,(SELECT JSON_OBJECT('id',CP.id,'uuId',CP.uuId,'userId',CP.userId) FROM Posts CP WHERE CP.id=CMT.postId) AS Post,(${getUserByObjectQuery(
      "CMT.userId",
    )}) AS User,(SELECT type FROM Reactions MR WHERE MR.userId=${
      user?.id
    } AND MR.commentId=CMT.id) AS myReactionType,(SELECT COUNT(*) FROM Reactions R WHERE R.commentId=CMT.id) AS totalReactions,(SELECT JSON_ARRAYAGG(JSON_OBJECT('id',RPC.id,'uuId',RPC.uuId,'text',RPC.text,'userId',RPC.userId,'postId',RPC.postId,'Post',(SELECT JSON_OBJECT('id',CRP.id,'uuId',CRP.uuId,'userId',CRP.userId) FROM Posts AS CRP WHERE CRP.id=RPC.postId),'postOwnerId',${postOwnerId},'currentUserId',${
      user?.id
    },'myReactionType',(SELECT type FROM Reactions RMR WHERE RMR.userId=${
      user?.id
    } AND RMR.commentId=RPC.id),'totalReactions',(SELECT COUNT(*) FROM Reactions RPCR WHERE RPCR.commentId=RPC.id ),'createdAt',RPC.createdAt,'User',(${getUserByObjectQuery(
      "RPC.userId",
    )}),'targetedComment',(SELECT JSON_OBJECT('id',TR.id,'User',(${getUserByObjectQuery(
      "TR.userId",
    )})) FROM Comments TR WHERE TR.id=RPC.targetedCommentId AND TR.userId!=RPC.userId))) FROM Comments AS RPC WHERE RPC.parentId=CMT.id) AS Replies FROM Comments CMT WHERE CMT.postId=${postId} AND CMT.parentId IS NULL ORDER BY CMT.id DESC LIMIT ${limitFrom},${limitTo}`,
  );

  return comments;
}

export async function addComment({ postId, text }: { postId: any; text: any }) {
  const user = await auth();

  try {
    if (text.length > 2000) {
      throw new Error("Comment is too big!");
    } else if (!text.length) {
      return null;
    } else {
      const mkuuId = await makeUniqueId("Comments");
      const postComment = await Model.prepare(
        "INSERT INTO Comments (uuId,text,postId,userId)VALUES(?,?,?,?)",
        [mkuuId, text, postId, user?.id],
      );

      const [getThePost] = await Model.prepare(
        "SELECT * FROM Posts WHERE id=?",
        [postId],
      );

      if (getThePost.userId !== user?.id) {
        //insert Notification
        await Model.prepare(
          "INSERT INTO Notifications (actionType,receiverUserId,senderUserId,commentId,postId)VALUES(?,?,?,?,?)",
          [
            "POST_COMMENT",
            getThePost.userId,
            user?.id,
            postComment.insertId,
            getThePost.id,
          ],
        );
      }
      const makeNewComment = {
        id: postComment.insertId,
        uuId: mkuuId,
        text: text,
        postId: postId,
        userId: user?.id,
        parentId: null,
        targetedCommentId: null,
        createdAt: Date.now(),
        currentUserId: user?.id,
        postOwnerId: null,
        User: user,
        myReactionType: null,
        totalReactions: 0,
        Replies: null,
      };

      revalidatePath("/");
      return makeNewComment;
    }
  } catch (error: any) {
    return error?.message;
  }
}

export async function deleteComment(commentId: number) {
  if (commentId) {
    //delete comment
    await Model.prepare("DELETE FROM Comments WHERE id=?", [commentId]);
    revalidatePath("/");
  }
}

export async function editComment(commentId: number, formData: any) {
  const comment = formData.get("comment");
  const currentUser = await auth();
  try {
    if (!comment.length) {
      throw new Error("Comment can not be empty");
    } else if (comment.length > 2000) {
      throw new Error("Comment can not be more than 2000 characters");
    } else {
      //edit comment
      await Model.prepare(
        "UPDATE Comments SET text=? WHERE id=? AND userId=?",
        [comment, commentId, currentUser?.id],
      );

      revalidatePath("/");
    }
  } catch (error: any) {
    console.log(error.message);
  }
}

//

export async function addMainCommentReply({
  commentId,
  text,
}: {
  commentId: any;
  text: any;
}) {
  const user = await auth();

  try {
    if (text.length > 2000) {
      throw new Error("Comment is too big!");
    } else if (!text.length) {
      throw new Error("Comment cannot be empty!");
    } else {
      const [getTheComment] = await Model.prepare(
        "SELECT * FROM Comments WHERE id=?",
        [commentId],
      );
      const mkuuId = await makeUniqueId("Comments");
      const postReply = await Model.prepare(
        "INSERT INTO Comments (uuId,text,postId,parentId,userId)VALUES(?,?,?,?,?)",
        [mkuuId, text, getTheComment?.postId, commentId, user?.id],
      );

      if (getTheComment.userId !== user?.id) {
        //insert Notification
        await Model.prepare(
          "INSERT INTO Notifications (actionType,receiverUserId,senderUserId,commentId,postId)VALUES(?,?,?,?,?)",
          [
            "NEW_COMMENT_REPLY",
            getTheComment.userId,
            user?.id,
            postReply.insertId,
            getTheComment?.postId,
          ],
        );
      }

      const makeNewComment = {
        id: postReply?.insertId,
        User: user,
        text: text,
        uuId: mkuuId,
        postId: getTheComment?.postId,
        userId: user?.id,
        createdAt: Date.now(),
        postOwnerId: getTheComment?.postOwnerId,
        currentUserId: user?.id,
        myReactionType: null,
        totalReactions: null,
        targetedComment: null,
      };
      return makeNewComment;
    }
  } catch (error: any) {
    return {
      status: false,
      message: error?.message,
    };
  }
}

export async function addReplyCommentReply({
  text,
  commentId,
}: {
  text: any;
  commentId: any;
}) {
  const user = await auth();

  try {
    if (text.length > 2000) {
      throw new Error("Comment is too big!");
    } else if (!text.length) {
      throw new Error("Please write something");
    } else {
      const mkuuId = await makeUniqueId("Comments");
      const [theComment] = await Model.prepare(
        "SELECT * FROM Comments WHERE id=?",
        [commentId],
      );

      const replyTheComment = await Model.prepare(
        "INSERT INTO Comments (uuId,text,postId,parentId,targetedCommentId,userId)VALUES(?,?,?,?,?,?)",
        [
          mkuuId,
          text,
          theComment?.postId,
          theComment?.parentId,
          theComment?.id,
          user?.id,
        ],
      );

      if (theComment?.userId !== user?.id) {
        await Model.prepare(
          "INSERT INTO Notifications(actionType,receiverUserId,senderUserId,postId,replyCommentId)VALUES(?,?,?,?,?)",
          [
            "NEW_REPLY_COMMENT_REPLY",
            theComment?.userId,
            user?.id,
            theComment?.postId,
            replyTheComment.insertId,
          ],
        );
      }
      const makeNewComment = {
        id: replyTheComment?.insertId,
        User: user,
        text: text,
        uuId: mkuuId,
        postId: theComment?.postId,
        userId: user?.id,
        createdAt: Date.now(),
        postOwnerId: null,
        currentUserId: user?.id,
        myReactionType: null,
        totalReactions: 0,
        targetedComment: null,
      };
      return makeNewComment;
    }
  } catch (error: any) {
    return {
      status: false,
      message: error?.message,
    };
  }
}
