"use server";
import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import makeUniqueId from "@/library/makeUniqueId";
import Model from "@/model/Model";

type Props = {
  text: string;
  commentId: any;
};

export default async function replyCommentReplyAction({
  text,
  commentId,
}: Props) {
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
    CookieStore.setState("error", error?.message);
  }
}
