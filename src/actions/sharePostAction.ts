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
    } else if (!text.length) {
      return null;
    } else {
      const mkuuId = await makeUniqueId("Posts");
      await Model.prepare(
        "INSERT INTO Posts (uuId,text,sharedId,userId)VALUES(?,?,?,?)",
        [mkuuId, text, postId, user?.id],
      );
      CookieStore.setState("success", "Post shared successfully");
    }
  } catch (error: any) {
    CookieStore.setState("error", error?.message);
  }
}
