"use server";

import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import makeUniqueId from "@/library/makeUniqueId";
import Model from "@/model/Model";

export default async function mainCommentReplyAction({
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
    CookieStore.setState("error", error?.message);
  }
}
