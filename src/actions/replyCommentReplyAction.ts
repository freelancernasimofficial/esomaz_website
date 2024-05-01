"use server";

import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import makeUniqueId from "@/library/makeUniqueId";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

export default async function replyCommentReplyAction(
  itemInfo: {
    postId: number;
    parentCommentId: number;
    targetedCommentId: number;
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
      const replyTheComment = await Model.prepare(
        "INSERT INTO Comments (uuId,text,postId,parentId,targetedCommentId,userId)VALUES(?,?,?,?,?,?)",
        [
          mkuuId,
          comment,
          itemInfo.postId,
          itemInfo.parentCommentId,
          itemInfo.targetedCommentId,
          user?.id,
        ],
      );
      console.log(replyTheComment);

      const [theTargetedComment] = await Model.prepare(
        "SELECT * FROM Comments WHERE id=?",
        [itemInfo.targetedCommentId],
      );
      if (theTargetedComment.userId !== user?.id) {
        await Model.prepare(
          "INSERT INTO Notifications(actionType,receiverUserId,senderUserId,postId,replyCommentId)VALUES(?,?,?,?,?)",
          [
            "NEW_REPLY_COMMENT_REPLY",
            theTargetedComment.userId,
            user?.id,
            theTargetedComment.postId,
            replyTheComment.insertId,
          ],
        );
      }
    }
    revalidatePath("/");
  } catch (error: any) {
    revalidatePath("/");
    CookieStore.setState("error", error?.message);
  }

  revalidatePath("/");
}
