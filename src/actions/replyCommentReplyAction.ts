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
      await Model.prepare(
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
    }
  } catch (error: any) {
    CookieStore.setState("error", error?.message);
  }

  revalidatePath("/");
}
