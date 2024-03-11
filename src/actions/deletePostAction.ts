"use server";

import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

export default async function deletePostAction(postId: number, formData: any) {
  if (postId) {
    //delete the post
    await Model.prepare("DELETE FROM Posts WHERE id=?", [postId]);
    revalidatePath("/");
  }
}
