"use server";

import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import Model from "@/model/Model";

export default async function editCommentAction(
  commentId: number,
  formData: any,
) {
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
      CookieStore.setState("success", "Comment updated successfully");
    }
  } catch (error: any) {
    CookieStore.setState("error", error?.message);
  }
}
