"use server";

import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import makeUniqueId from "@/library/makeUniqueId";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

export default async function postCommentAction(postId: number, formData: any) {
  const comment = formData.get("comment");
  const user = await auth();

  try {
    if (comment.length > 2000) {
      throw new Error("Comment is too big!");
    } else if (!comment.length) {
      return null;
    } else {
      const mkuuId = await makeUniqueId("Comments");
      const postComment = await Model.prepare(
        "INSERT INTO Comments (uuId,text,postId,userId)VALUES(?,?,?,?)",
        [mkuuId, comment, postId, user?.id],
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
    }
  } catch (error: any) {
    CookieStore.setState("error", error?.message);
  }

  revalidatePath("/");
}
