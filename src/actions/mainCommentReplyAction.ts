"use server";

import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import makeUniqueId from "@/library/makeUniqueId";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

export default async function mainCommentReplyAction(
  itemInfo: {
    postId: number;
    commentId: number;
  },
  formData: any,
) {
  const comment = formData.get("comment");
  const user = await auth();

  try {
    if (comment.length > 2000) {
      throw new Error("Comment is too big!");
    } else if (!comment.length) {
      return null;
    } else {
      const mkuuId = await makeUniqueId("Comments");
      const postReply = await Model.prepare(
        "INSERT INTO Comments (uuId,text,postId,parentId,userId)VALUES(?,?,?,?,?)",
        [mkuuId, comment, itemInfo.postId, itemInfo.commentId, user?.id],
      );
      const [getTheComment] = await Model.prepare(
        "SELECT * FROM Comments WHERE id=?",
        [itemInfo.commentId],
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
            itemInfo.postId,
          ],
        );
      }
    }
  } catch (error: any) {
    CookieStore.setState("error", error?.message);
  }
}
