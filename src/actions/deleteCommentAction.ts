"use server";

import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

export default async function deleteCommentAction(commentId: number) {
  if (commentId) {
    //delete comment
    await Model.prepare("DELETE FROM Comments WHERE id=?", [commentId]);
    revalidatePath("/");
  }
}
