"use server";

import CookieStore from "@/library/CookieStore";
import auth from "@/library/auth";
import Model from "@/model/Model";
import { revalidatePath } from "next/cache";

export default async function editPostAction(postId: number, formData: any) {
  const text = formData.get("text");
  const currentUser = await auth();
  try {
    if (text.length > 2000) {
      throw new Error("Post can not be more than 2000 characters");
    } else {
      //edit comment
      await Model.prepare("UPDATE Posts SET text=? WHERE id=? AND userId=?", [
        text,
        postId,
        currentUser?.id,
      ]);
      CookieStore.setState("success", "Post updated successfully");
      revalidatePath("/");
    }
  } catch (error: any) {
    CookieStore.setState("error", error?.message);
  }
}
