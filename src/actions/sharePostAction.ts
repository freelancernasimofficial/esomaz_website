"use server";

import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import makeUniqueId from "@/library/makeUniqueId";
import Model from "@/model/Model";

export default async function sharePostAction(postId: any, formData: any) {
  const text = formData?.get("text");
  const user = await auth();

  try {
    if (text.length > 2000) {
      throw new Error("Text length is too big!");
    } else {
      const mkuuId = await makeUniqueId("Posts");
      const sharePost = await Model.prepare(
        "INSERT INTO Posts (uuId,text,sharedId,userId)VALUES(?,?,?,?)",
        [mkuuId, text, postId, user?.id],
      );
      //send notification
      const [getThePost] = await Model.prepare(
        "SELECT * FROM Posts WHERE id=?",
        [postId],
      );
      const notify = await Model.prepare(
        "INSERT INTO Notifications (actionType,receiverUserId,senderUserId,postId,sharedPostId)VALUES(?,?,?,?,?)",
        [
          "NEW_POST_SHARE",
          getThePost.userId,
          user?.id,
          postId,
          sharePost.insertId,
        ],
      );
      CookieStore.setState("success", "Post shared successfully");
    }
  } catch (error: any) {
    CookieStore.setState("error", error?.message);
  }
}
